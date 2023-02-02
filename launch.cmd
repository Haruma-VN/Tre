@echo off

set params=%~dp0%
set params=%params:~0,-1%

node "%params%\main.js" ^
	%*
pause
