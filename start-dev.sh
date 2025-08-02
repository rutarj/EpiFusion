#!/bin/bash

echo "Starting EpiFusion Development Environment..."
echo

echo "Starting Backend Server..."
cd epifusion-backend && npm start &
BACKEND_PID=$!

echo "Waiting 3 seconds for backend to start..."
sleep 3

echo "Starting Frontend Dashboard..."
cd ../epifusion-dashboard && npm run dev &
FRONTEND_PID=$!

echo
echo "Both servers are starting..."
echo "Backend: http://localhost:5050"
echo "Frontend: http://localhost:3000"
echo
echo "Press Ctrl+C to stop both servers..."

# Wait for user to stop
trap "echo 'Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait 