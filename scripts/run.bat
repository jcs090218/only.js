@echo off
:: ========================================================================
:: $File: run.bat $
:: $Date: 2019-05-08 11:15:01 $
:: $Revision: $
:: $Creator: Jen-Chieh Shen $
:: $Notice: See LICENSE.txt for modification and distribution information
::                   Copyright © 2019 by Shen, Jen-Chieh $
:: ========================================================================


::start ../test/normal/index.html
::start ../test/unit/index.html
"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" "../test/normal/index.html"
"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" "../test/unit/index.html"
