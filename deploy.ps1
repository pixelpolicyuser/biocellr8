<#
.SYNOPSIS
    Automated deployment script for BioCellR8 LLC website to GitHub Pages.
.DESCRIPTION
    This script handles the complete Git workflow for deploying the BioCellR8 professional website.
    It performs safety checks, stages all changes, commits with a descriptive message, and pushes to the main branch.
    
    Run this script from the biocellr8-website directory (or parent containing the repo).
    
    Prerequisites:
    - Git installed and configured
    - You have push access to https://github.com/pixelpolicyuser/biocellr8
    - PowerShell 5.1+ or PowerShell 7+
#>

param(
    [string]$CommitMessage = "chore: Update BioCellR8 website - professional refinements and content polish"
)

Write-Host "🚀 BioCellR8 Website Deployment Script" -ForegroundColor Cyan
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host ""

# Check if we're in a git repository
if (-not (Test-Path ".git")) {
    Write-Host "❌ Error: This directory is not a Git repository." -ForegroundColor Red
    Write-Host "   Please navigate to the biocellr8-website folder (or the root of the cloned repo)." -ForegroundColor Yellow
    exit 1
}

# Check for uncommitted changes
$status = git status --porcelain
if (-not $status) {
    Write-Host "ℹ️  No changes detected. Website is already up to date." -ForegroundColor Yellow
    exit 0
}

Write-Host "📋 Detected changes:" -ForegroundColor Green
git status --short

Write-Host ""
Write-Host "📦 Staging all changes..." -ForegroundColor Cyan
git add .

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to stage files." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Files staged successfully." -ForegroundColor Green

Write-Host ""
Write-Host "💾 Creating commit..." -ForegroundColor Cyan
git commit -m $CommitMessage

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Commit failed. Please check your changes." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Commit created." -ForegroundColor Green

Write-Host ""
Write-Host "🌐 Pushing to GitHub (main branch)..." -ForegroundColor Cyan
git push origin main

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Push failed. Possible causes:" -ForegroundColor Red
    Write-Host "   - No internet connection" -ForegroundColor Yellow
    Write-Host "   - Authentication required (run 'git push' manually or configure credentials)" -ForegroundColor Yellow
    Write-Host "   - Branch protection rules on main" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "🎉 Deployment successful!" -ForegroundColor Green
Write-Host ""
Write-Host "Your updated website will be live at:" -ForegroundColor White
Write-Host "https://pixelpolicyuser.github.io/biocellr8/" -ForegroundColor Cyan
Write-Host ""
Write-Host "Note: GitHub Pages deployment typically takes 30-90 seconds to propagate." -ForegroundColor Gray