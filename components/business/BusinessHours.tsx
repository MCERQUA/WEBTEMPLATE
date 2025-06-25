import { useMemo } from 'react'
import { cn } from '@/lib/utils/cn'

export interface DayHours {
  day: string
  open: string
  close: string
  closed?: boolean
}

export interface BusinessHoursProps {
  /** Array of hours for each day */
  hours: DayHours[]
  /** Timezone for the business (e.g., "America/New_York") */
  timezone?: string
  /** Whether to show current status */
  showStatus?: boolean
  /** Whether to highlight today */
  highlightToday?: boolean
  /** Compact mode for smaller displays */
  compact?: boolean
  /** Additional CSS classes */
  className?: string
  /** Override current time for testing */
  currentTime?: Date
}

const DAYS_OF_WEEK = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

function formatTime(time: string): string {
  // Convert 24-hour time to 12-hour format
  const [hours, minutes] = time.split(':').map(Number)
  const period = hours >= 12 ? 'PM' : 'AM'
  const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`
}

function isBusinessOpen(
  dayHours: DayHours,
  currentTime: Date,
  timezone?: string
): boolean {
  if (dayHours.closed) return false

  // Get current time in business timezone
  const now = currentTime || new Date()
  const currentDay = DAYS_OF_WEEK[now.getDay()]
  
  // Check if it's the current day
  if (dayHours.day !== currentDay) return false

  // Parse hours and minutes
  const [openHour, openMinute] = dayHours.open.split(':').map(Number)
  const [closeHour, closeMinute] = dayHours.close.split(':').map(Number)
  
  const currentHour = now.getHours()
  const currentMinute = now.getMinutes()
  const currentTotalMinutes = currentHour * 60 + currentMinute
  const openTotalMinutes = openHour * 60 + openMinute
  const closeTotalMinutes = closeHour * 60 + closeMinute

  // Handle cases where closing time is after midnight
  if (closeTotalMinutes < openTotalMinutes) {
    return currentTotalMinutes >= openTotalMinutes || currentTotalMinutes < closeTotalMinutes
  }

  return currentTotalMinutes >= openTotalMinutes && currentTotalMinutes < closeTotalMinutes
}

export function BusinessHours({
  hours,
  timezone,
  showStatus = true,
  highlightToday = true,
  compact = false,
  className,
  currentTime,
}: BusinessHoursProps) {
  // Memoize the current time and day to prevent dependency issues
  const { now, currentDay } = useMemo(() => {
    const time = currentTime || new Date()
    return {
      now: time,
      currentDay: DAYS_OF_WEEK[time.getDay()]
    }
  }, [currentTime])

  const { isOpen, currentDayHours } = useMemo(() => {
    const todayHours = hours.find(h => h.day === currentDay)
    if (!todayHours) return { isOpen: false, currentDayHours: null }

    const open = isBusinessOpen(todayHours, now, timezone)
    return { isOpen: open, currentDayHours: todayHours }
  }, [hours, currentDay, now, timezone])

  // Get next opening time
  const nextOpenTime = useMemo(() => {
    if (isOpen) return null

    // Find next day that's open
    const todayIndex = DAYS_OF_WEEK.indexOf(currentDay)
    for (let i = 1; i <= 7; i++) {
      const nextDayIndex = (todayIndex + i) % 7
      const nextDay = DAYS_OF_WEEK[nextDayIndex]
      const nextDayHours = hours.find(h => h.day === nextDay)
      
      if (nextDayHours && !nextDayHours.closed) {
        return {
          day: nextDay,
          time: formatTime(nextDayHours.open),
          isToday: i === 0,
          isTomorrow: i === 1,
        }
      }
    }
    return null
  }, [isOpen, currentDay, hours])

  if (compact) {
    return (
      <div className={cn('space-y-2', className)}>
        {showStatus && (
          <div className="flex items-center gap-2">
            <span
              className={cn(
                'inline-block w-2 h-2 rounded-full',
                isOpen ? 'bg-green-500' : 'bg-red-500'
              )}
              aria-hidden="true"
            />
            <span className={cn('font-medium', isOpen ? 'text-green-600' : 'text-red-600')}>
              {isOpen ? 'Open Now' : 'Closed'}
            </span>
            {!isOpen && nextOpenTime && (
              <span className="text-sm text-muted-foreground">
                • Opens {nextOpenTime.isTomorrow ? 'tomorrow' : nextOpenTime.day} at{' '}
                {nextOpenTime.time}
              </span>
            )}
          </div>
        )}
        
        <button
          className="text-sm text-primary hover:underline"
          onClick={() => {
            // Toggle expanded view or show modal
            console.log('Show full hours')
          }}
        >
          View all hours
        </button>
      </div>
    )
  }

  return (
    <div className={cn('space-y-4', className)}>
      {showStatus && (
        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                'inline-block w-3 h-3 rounded-full',
                isOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'
              )}
              aria-hidden="true"
            />
            <span
              className={cn(
                'font-semibold',
                isOpen ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              )}
            >
              {isOpen ? 'Open Now' : 'Closed'}
            </span>
          </div>
          {!isOpen && nextOpenTime && (
            <span className="text-sm text-muted-foreground">
              Opens {nextOpenTime.isTomorrow ? 'tomorrow' : nextOpenTime.day} at {nextOpenTime.time}
            </span>
          )}
        </div>
      )}

      <div className="space-y-1" role="list" aria-label="Business hours">
        {hours.map((dayHours, index) => {
          const isToday = dayHours.day === currentDay
          const isCurrentlyOpen = isToday && isOpen

          return (
            <div
              key={index}
              className={cn(
                'flex items-center justify-between py-2 px-3 rounded-md transition-colors',
                isToday && highlightToday && 'bg-accent',
                isCurrentlyOpen && 'bg-green-50 dark:bg-green-950/20'
              )}
              role="listitem"
            >
              <span
                className={cn(
                  'font-medium',
                  isToday && 'text-primary',
                  dayHours.closed && 'text-muted-foreground'
                )}
              >
                {dayHours.day}
                {isToday && (
                  <span className="ml-2 text-xs text-muted-foreground">(Today)</span>
                )}
              </span>
              
              <span
                className={cn(
                  'text-sm',
                  dayHours.closed && 'text-muted-foreground italic'
                )}
              >
                {dayHours.closed ? (
                  'Closed'
                ) : (
                  <>
                    {formatTime(dayHours.open)} - {formatTime(dayHours.close)}
                  </>
                )}
              </span>
            </div>
          )
        })}
      </div>

      {timezone && (
        <p className="text-xs text-muted-foreground text-center">
          All times shown in {timezone.replace('_', ' ')} timezone
        </p>
      )}
    </div>
  )
}