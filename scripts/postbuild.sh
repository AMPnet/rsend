#!/usr/bin/env bash

echo "Running envsub on env.template.js to env.js"
envsub src/env.template.js dist/rsend/env.js

rm dist/rsend/ngsw.json
ngsw-config dist/rsend ngsw-config.json
