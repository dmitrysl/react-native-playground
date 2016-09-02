#!/bin/bash
set -ev
cd ${0%/*}
echo ${0%/*}
echo $(basename pwd)
#run_gulp()
#{
#    gulp
#    return $?
#}
#
gulp
cd ../..