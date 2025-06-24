@echo off
setlocal EnableDelayedExpansion

:: Check if config file exists
set "config_file=git_config.txt"
if not exist %config_file% (
    echo Configuration file not found!
    echo Please run GIT-UPDATE-REPO.bat first to set up the repository URL.
    pause
    exit /b 1
) else (
    :: Read the URL from config file
    set /p github_url=<%config_file%
)

echo ========================================
echo Pulling from: !github_url!
echo ========================================
echo.

:: Check if .git directory exists
if not exist .git (
    echo No git repository found in this directory!
    echo Initializing and setting up repository...
    git init
    git remote add origin !github_url!
    git branch -M main
    echo.
)

:: Check if remote origin exists and update if needed
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo Adding remote origin...
    git remote add origin !github_url!
) else (
    :: Update remote URL if it's different
    for /f "tokens=*" %%a in ('git remote get-url origin') do set current_url=%%a
    if not "!current_url!"=="!github_url!" (
        echo Updating remote URL...
        git remote set-url origin !github_url!
    )
)

:: Stash any local changes
echo Checking for local changes...
git diff --quiet
if errorlevel 1 (
    echo Local changes detected. Stashing them...
    git stash push -m "Auto-stash before pull %date% %time%"
    set "stashed=1"
) else (
    set "stashed=0"
)

:: Pull from repository
echo.
echo Pulling latest changes...
git pull origin main --rebase

:: Check if pull was successful
if errorlevel 1 (
    echo.
    echo ========================================
    echo ERROR: Pull failed!
    echo ========================================
    echo Possible reasons:
    echo - Network connection issues
    echo - Authentication problems
    echo - Merge conflicts
    echo.
    echo Try running: git pull origin main --rebase
    echo manually to see detailed error messages.
    
    :: Restore stashed changes if any
    if "!stashed!"=="1" (
        echo.
        echo Restoring your local changes...
        git stash pop
    )
    pause
    exit /b 1
)

:: Restore stashed changes if any
if "!stashed!"=="1" (
    echo.
    echo Restoring your local changes...
    git stash pop
    if errorlevel 1 (
        echo.
        echo WARNING: Could not automatically restore local changes.
        echo Your changes are saved in git stash.
        echo Run 'git stash list' to see them.
    )
)

echo.
echo ========================================
echo Repository updated successfully!
echo ========================================
echo.

:: Show brief status
git status --short

pause