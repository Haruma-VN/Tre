@echo off
for %%a in (%*) do (node test_unpack.js "%~1" 
)
pause