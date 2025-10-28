# PowerShell script to create a branch, commit changes, and push to GitHub
# This script assumes you have Git installed and configured with your GitHub credentials

Write-Host "Starting Git operations for AlgoVisualizer performance algorithms implementation" -ForegroundColor Green

# Check if we're in a git repository
if (-not (Test-Path .git)) {
    Write-Host "Error: Not in a Git repository. Please run this script from the root of your Git repository." -ForegroundColor Red
    exit 1
}

# Get current branch
$currentBranch = git branch --show-current
Write-Host "Current branch: $currentBranch" -ForegroundColor Yellow

# Create a new branch for the changes
$branchName = "performance-algorithms-completion-" + (Get-Date -Format "yyyyMMdd-HHmmss")
Write-Host "Creating new branch: $branchName" -ForegroundColor Cyan
git checkout -b $branchName

# Add all changes
Write-Host "Adding all changes to staging area" -ForegroundColor Cyan
git add .

# Commit the changes
Write-Host "Committing changes" -ForegroundColor Cyan
git commit -m "Complete performance implementations for all missing algorithms"

# Push the branch to origin
Write-Host "Pushing branch to origin" -ForegroundColor Cyan
git push origin $branchName

# Provide instructions for creating a pull request
Write-Host ""
Write-Host "Git operations completed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "To create a pull request:" -ForegroundColor Yellow
Write-Host "1. Go to your GitHub repository page" -ForegroundColor White
Write-Host "2. Navigate to the 'Pull requests' tab" -ForegroundColor White
Write-Host "3. Click 'New pull request'" -ForegroundColor White
Write-Host "4. Select your branch '$branchName' as the compare branch" -ForegroundColor White
Write-Host "5. Review your changes and click 'Create pull request'" -ForegroundColor White
Write-Host ""
Write-Host "Your contribution is ready to be submitted!" -ForegroundColor Green