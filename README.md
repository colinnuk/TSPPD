# TSPPD
Travelling salesman problem with contraints on pickup and dropoff.
https://drive.google.com/file/d/1nE782S8Ss68JepMQNeZhUrCUatKK4XvY/view

### Running
The algorithm can be run by using tests from Test.ts. This sets it up with a test dataset and prints out results to the console.

### Implementation
I decided to go with a simple greeedy (nearest neighbour) approach. This is efficient, easy to implement, and produces a reasonable approximation of the solution.

I spent a few hours on this total. Most of my time was actually spent getting used to using TypeScript - I've never used it before!

### Assumptions
1. The shuttle was infinitely big, so the shuttle can carry all passengers at once. One way I could have implemented a rider limit would have been to only fill waypointsToVisit[] with dropoffs once the limit was reached.

### Questions
1. As this implementation only provides a greedy search, it's likely that for any extended search space the optimal solution won't be found. Also my implementation only performs a single pass on the search space, and doesn't try and reoptimise any given route.
2. Given more time I would implement a different method. I have experience using Genetic Algorithms, and some research suggests that people have successfully applied GAs to the TSP before, so it would be cool to try it on this constrained version! 

Implementing a limit on the riders per shuttle (see assumption #1 above) would also have been a future improvement.
3. As I said above, the time consuming part was mainly learning TypeScript syntax and nuances!
