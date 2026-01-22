#!/bin/bash
input=$(cat)

# Parse JSON fields
MODEL=$(echo "$input" | jq -r '.model.display_name // "Claude"')
COST=$(echo "$input" | jq -r '.cost.total_cost_usd // 0')
PERCENT_USED=$(echo "$input" | jq -r '.context_window.used_percentage // 0' | cut -d. -f1)
LINES_ADDED=$(echo "$input" | jq -r '.cost.total_lines_added // 0')
LINES_REMOVED=$(echo "$input" | jq -r '.cost.total_lines_removed // 0')

# Git branch
GIT_BRANCH=""
if git rev-parse --git-dir > /dev/null 2>&1; then
    BRANCH=$(git branch --show-current 2>/dev/null)
    [ -n "$BRANCH" ] && GIT_BRANCH=" $BRANCH"
fi

# ANSI colors
CYAN=$'\033[36m'
GREEN=$'\033[32m'
BRIGHT_GREEN=$'\033[92m'
YELLOW=$'\033[33m'
RED=$'\033[31m'
DIM=$'\033[2m'
GRAY=$'\033[90m'
RESET=$'\033[0m'

# Context color based on usage
if [ "$PERCENT_USED" -lt 50 ]; then
    CTX_COLOR=$BRIGHT_GREEN
elif [ "$PERCENT_USED" -lt 80 ]; then
    CTX_COLOR=$YELLOW
else
    CTX_COLOR=$RED
fi

# Progress bar (20 chars wide)
BAR_WIDTH=20
FILLED=$((PERCENT_USED * BAR_WIDTH / 100))
EMPTY=$((BAR_WIDTH - FILLED))
FILLED_BAR=$(printf "%${FILLED}s" | tr ' ' '█')
EMPTY_BAR=$(printf "%${EMPTY}s" | tr ' ' '░')
BAR="${CTX_COLOR}${FILLED_BAR}${GRAY}${EMPTY_BAR}${RESET}"

# Format cost
COST_FMT=$(printf "%.2f" "$COST")

# Output status line
printf "${CYAN}%s${RESET} |${DIM}%s${RESET} | %s ${CTX_COLOR}%s%%${RESET} | ${DIM}\$%s${RESET} | ${BRIGHT_GREEN}+%s${RESET} ${RED}-%s${RESET}\n" \
    "$MODEL" "$GIT_BRANCH" "$BAR" "$PERCENT_USED" "$COST_FMT" "$LINES_ADDED" "$LINES_REMOVED"
