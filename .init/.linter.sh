#!/bin/bash
cd /home/kavia/workspace/code-generation/preventive-maintenance-management-system-176377-176387/maintenance_frontend
npx eslint
ESLINT_EXIT_CODE=$?
npm run build
BUILD_EXIT_CODE=$?
if [ $ESLINT_EXIT_CODE -ne 0 ] || [ $BUILD_EXIT_CODE -ne 0 ]; then
   exit 1
fi

