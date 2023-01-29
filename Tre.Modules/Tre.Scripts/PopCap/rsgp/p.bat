@echo off
for %%a in (%*) do (node test_pack.js "%~1" 
)
pause