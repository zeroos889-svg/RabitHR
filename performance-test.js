/**
 * Performance Testing Script for Rabit HR Platform
 * Uses Artillery.io for load testing
 *
 * Install: npm install -g artillery
 * Run: artillery run performance-test.yml
 */

// This is the YAML config for Artillery
const artilleryConfig = `
config:
  target: "http://localhost:3000"
  phases:
    # Warm-up phase
    - duration: 60
      arrivalRate: 5
      name: "Warm up"
    
    # Ramp-up phase
    - duration: 120
      arrivalRate: 5
      rampTo: 50
      name: "Ramp up load"
    
    # Sustained load
    - duration: 300
      arrivalRate: 50
      name: "Sustained load"
    
    # Peak load
    - duration: 120
      arrivalRate: 100
      name: "Peak load"
    
    # Cool down
    - duration: 60
      arrivalRate: 10
      name: "Cool down"

  processor: "./performance-test-processor.js"
  
  # Performance thresholds
  ensure:
    maxErrorRate: 1          # Max 1% error rate
    p95: 500                 # 95% of requests under 500ms
    p99: 1000                # 99% of requests under 1000ms

scenarios:
  # Health Check
  - name: "Health Check"
    weight: 5
    flow:
      - get:
          url: "/health"
          expect:
            - statusCode: 200

  # Homepage
  - name: "Homepage Load"
    weight: 10
    flow:
      - get:
          url: "/"
          expect:
            - statusCode: 200

  # Authentication Flow
  - name: "Login Flow"
    weight: 15
    flow:
      - post:
          url: "/api/auth/login"
          json:
            username: "test@example.com"
            password: "TestPassword123!"
          capture:
            - json: "$.token"
              as: "authToken"
          expect:
            - statusCode: 200

  # Employee List
  - name: "Employee List"
    weight: 20
    flow:
      - post:
          url: "/api/auth/login"
          json:
            username: "admin@rabithr.com"
            password: "AdminPass123!"
          capture:
            - json: "$.token"
              as: "authToken"
      - get:
          url: "/api/employees"
          headers:
            Authorization: "Bearer {{ authToken }}"
          expect:
            - statusCode: 200

  # Dashboard Load
  - name: "Dashboard"
    weight: 25
    flow:
      - post:
          url: "/api/auth/login"
          json:
            username: "admin@rabithr.com"
            password: "AdminPass123!"
          capture:
            - json: "$.token"
              as: "authToken"
      - get:
          url: "/api/dashboard"
          headers:
            Authorization: "Bearer {{ authToken }}"
          expect:
            - statusCode: 200

  # Attendance Check-in
  - name: "Attendance Check-in"
    weight: 15
    flow:
      - post:
          url: "/api/auth/login"
          json:
            username: "employee@rabithr.com"
            password: "EmpPass123!"
          capture:
            - json: "$.token"
              as: "authToken"
      - post:
          url: "/api/attendance/checkin"
          headers:
            Authorization: "Bearer {{ authToken }}"
          json:
            timestamp: "{{ $timestamp }}"
          expect:
            - statusCode: [200, 201]

  # Static Assets
  - name: "Static Assets"
    weight: 10
    flow:
      - get:
          url: "/assets/main.js"
      - get:
          url: "/assets/styles.css"
      - get:
          url: "/assets/logo.png"
`;

console.log("Artillery Performance Test Configuration");
console.log("==========================================");
console.log("");
console.log("To run this test:");
console.log("1. Save the config above to: performance-test.yml");
console.log("2. Install Artillery: npm install -g artillery");
console.log("3. Run: artillery run performance-test.yml");
console.log("");
console.log("Expected Performance Metrics:");
console.log("- Response Time (p95): < 500ms");
console.log("- Response Time (p99): < 1000ms");
console.log("- Error Rate: < 1%");
console.log("- Throughput: > 100 req/s");
console.log("");
console.log("Test Phases:");
console.log("1. Warm up: 5 users/sec for 60s");
console.log("2. Ramp up: 5-50 users/sec for 120s");
console.log("3. Sustained: 50 users/sec for 300s");
console.log("4. Peak: 100 users/sec for 120s");
console.log("5. Cool down: 10 users/sec for 60s");
