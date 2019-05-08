#!/bin/sh
# ========================================================================
# $File: build.sh $
# $Date: 2019-05-08 14:41:26 $
# $Revision: $
# $Creator: Jen-Chieh Shen $
# $Notice: See LICENSE.txt for modification and distribution information
#                   Copyright © 2019 by Shen, Jen-Chieh $
# ========================================================================


cd ..

grunt concat
minify-dir build
