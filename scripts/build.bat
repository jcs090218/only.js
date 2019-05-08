@echo off
:: ========================================================================
:: $File: build.bat $
:: $Date: 2019-05-08 11:37:51 $
:: $Revision: $
:: $Creator: Jen-Chieh Shen $
:: $Notice: See LICENSE.txt for modification and distribution information
::                   Copyright © 2019 by Shen, Jen-Chieh $
:: ========================================================================


cd ..

call grunt concat
call minify-dir build
