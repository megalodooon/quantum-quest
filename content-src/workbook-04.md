# Part 4 workbook: multivariable and vector calculus

The highlight is 4.10 and 4.20: you normalize the real hydrogen ground state and check that it solves the Schrödinger equation.

### 4.1 Functions of several variables

**Checks**

- [ ] I can picture f(x, y) as a surface and as a contour map.

**Exercises**

1. Describe the contour lines of f = x² + y².
2. Describe the surface and contours of f = x² − y².
3. On a hiking map, what do contour lines that crowd together mean?
4. Temperature on a plate is T = 20 + 5x − 3y. In which direction does it rise fastest?

### 4.2 Partial derivatives

**Checks**

- [ ] I can take partial derivatives and mixed second derivatives.

**Exercises**

1. For f = x²y + sin(xy), find ∂f/∂x and ∂f/∂y.
2. For the ideal gas P = nRT/V, find ∂P/∂T and ∂P/∂V and explain each physically.
3. For f = x³y², check that ∂²f/∂x∂y = ∂²f/∂y∂x.
4. For ψ = sin(kx − ωt), show that ∂²ψ/∂t² = (ω/k)² ∂²ψ/∂x². What equation is this?

### 4.3 The gradient

**Checks**

- [ ] I can compute a gradient and explain why force = −∇(potential energy).

**Exercises**

1. ∇(x² + y²)
2. Potential energy near the ground is U = mgz. Find the force.
3. With r = √(x² + y² + z²), show ∂(1/r)/∂x = −x/r³. Use it to find the electric field from V = k/r.
4. A hill has height h = 100 − x² − 2y². At (3, 1), which way is steepest uphill?

### 4.4 Directional derivatives

**Checks**

- [ ] I can find the rate of change of f in any direction.

**Exercises**

1. For f = x²y at (1, 2), find the rate of change in the direction (3, 4)/5.
2. In which direction is that rate zero?
3. What is the largest possible rate there?

### 4.5 The multivariable chain rule

**Checks**

- [ ] I can differentiate along a path through several variables.

**Exercises**

1. z = x²y with x = cos t and y = sin t. Find dz/dt.
2. Temperature is T = x + y². A walker moves along (t, 2t). How fast does the temperature they feel change?
3. Write ∂f/∂r in terms of ∂f/∂x and ∂f/∂y, using x = r cos θ and y = r sin θ.

### 4.6 Hessians and multivariable Taylor series

**Checks**

- [ ] I can classify a critical point as minimum, maximum or saddle using the Hessian.

**Exercises**

1. Classify the origin for x² + 3y², x² − y² and −x² − y².
2. Find the Hessian of x² + xy + y² at the origin and its eigenvalues (see 3.11). What kind of point is it?
3. Near a minimum, any potential looks like a bowl described by its Hessian. Explain why molecules vibrate in patterns given by the Hessian's eigenvectors.

### 4.7 Lagrange multipliers

**Checks**

- [ ] I can optimize a function under a constraint.

**Exercises**

1. Maximize xy subject to x + y = 10.
2. Find the box with the largest volume for a surface area of 6.
3. Find the point on x + 2y = 5 closest to the origin.
4. Maximize −(p₁ ln p₁ + … + pₙ ln pₙ) subject to p₁ + … + pₙ = 1. What does the answer say about maximum entropy? (Add an energy constraint and you get the Boltzmann factor of 10.15.)

### 4.8 Double and triple integrals

**Checks**

- [ ] I can set up and evaluate integrals over rectangles and simple regions, in either order.

**Exercises**

1. Integrate xy over the rectangle 0 ≤ x ≤ 1, 0 ≤ y ≤ 2.
2. Find the volume under z = x² + y² over the unit square.
3. A triangular plate 0 ≤ y ≤ x ≤ 1 has density ρ = x. Find its mass.
4. Redo Exercise 3 with the order of integration swapped.

### 4.9 Change of variables and the Jacobian

**Checks**

- [ ] I can explain where the Jacobian factor comes from and use it.

**Exercises**

1. Show that the Jacobian of polar coordinates is r.
2. Find the area of a disc of radius R in polar coordinates.
3. Redo the Gaussian integral of 2.23 as a 2D integral in polar coordinates.
4. Map the unit disc with x = au, y = bv. Use the Jacobian to find the area of an ellipse.

### 4.10 Cylindrical and spherical coordinates

**Checks**

- [ ] I can integrate with the volume element r² sin θ dr dθ dφ.
- [ ] I can normalize a 3D wavefunction that depends only on r.

**Exercises**

1. Derive the volume of a ball.
2. Derive the surface area of a sphere.
3. The hydrogen ground state is ψ = A e^(−r/a). Find A so the total probability is 1. (Use the integral of xⁿ e⁻ˣ from 0 to ∞ = n! from 2.19.)
4. What is the probability of finding the electron within r < a?
5. Find the average distance ⟨r⟩ of the electron from the nucleus.

### 4.10b Solid angle

**Checks**

- [ ] I know a sphere is 4π steradians and can find the solid angle of a cone.

**Exercises**

1. Derive the solid angle 2π(1 − cos θ) of a cone with half-angle θ. Evaluate it for 60°.
2. The Sun's disc has an angular radius of 0.27°. About what solid angle does it cover?
3. A source emits equally in all directions. What fraction hits a 1 cm² detector 1 m away?

### 4.11 Vector fields

**Checks**

- [ ] I can sketch a vector field and read its behaviour.

**Exercises**

1. Sketch F = (−y, x) and F = (x, y). Describe each in one word.
2. Which of the two looks like the electric field around a positive charge?
3. If F is the velocity of water, where would a floating leaf go in each field?

### 4.12 Line integrals

**Checks**

- [ ] I can compute work along a path and test whether the path matters.

**Exercises**

1. Find the work done by F = (y, x) from (0, 0) to (1, 1) along the straight line, then via (1, 0). Compare.
2. Find the circulation of F = (−y, x) around the unit circle.
3. Why does gravity do the same work whether you slide down a ramp or fall straight down?

### 4.13 Surface integrals and flux

**Checks**

- [ ] I can compute the flux of a field through a surface.

**Exercises**

1. Find the flux of F = (0, 0, 3) through the unit square in the xy-plane.
2. Find the flux of F = r/r³ (pointing outward, strength 1/r²) through a sphere of radius R. Why doesn't R matter?
3. Find the flux of F = (x, y, z) through a sphere of radius R.

### 4.14 Divergence and curl

**Checks**

- [ ] I can compute divergence and curl and say what each measures.

**Exercises**

1. Find the divergence and curl of (x, y, z).
2. Find the divergence and curl of (−y, x, 0).
3. The field r/r³ has zero divergence everywhere except the origin. Where is its source?
4. Which field pattern describes a whirlpool, a tap and a drain?

### 4.15 Green's theorem

**Checks**

- [ ] I can turn a loop integral into an area integral and back.

**Exercises**

1. Check Green's theorem for F = (−y, x) on the unit disc.
2. Use ½∮(x dy − y dx) to find the area of an ellipse.
3. Look up how a planimeter measures area by tracing a boundary. Why does it work?

### 4.16 Stokes' theorem

**Checks**

- [ ] I can relate circulation around a loop to the flux of the curl through any surface it bounds.

**Exercises**

1. Check Stokes' theorem for F = (−y, x, 0) using the upper half of the unit sphere.
2. Why is the circulation of any gradient field around a closed loop zero?
3. Ampere's law says the circulation of B around a loop equals μ₀ times the current through it. Which theorem turns this into a statement about curl B?

### 4.17 The divergence theorem

**Checks**

- [ ] I can relate total outflow through a closed surface to the divergence inside.

**Exercises**

1. Check the theorem for F = (x, y, z) on a ball of radius R. Compare with 4.13 Exercise 3.
2. If charge is conserved, show that ∂ρ/∂t + ∇ · J = 0. (Quantum probability obeys the same equation in 15.20.)
3. Use the theorem with 4.13 Exercise 2 to explain Gauss's law for a point charge.

### 4.18 Conservative fields

**Checks**

- [ ] I can test whether a field is a gradient and find its potential.

**Exercises**

1. Is F = (2xy, x² + 1) conservative? Find a potential if so.
2. Is F = (y, −x) conservative?
3. Why does conservation of energy require a conservative force?

### 4.19 The Laplacian

**Checks**

- [ ] I can compute ∇² and explain it as "different from the neighbours' average".

**Exercises**

1. ∇²(x² + y² + z²)
2. Show ∇²(1/r) = 0 away from the origin.
3. Show sin(kx) sin(ky) is an eigenfunction of the 2D Laplacian and find the eigenvalue. (This is a particle in a 2D box.)
4. Show that [f(x + h) + f(x − h) − 2f(x)]/h² approaches f″(x). How does this explain the "neighbours" picture?
5. The kinetic energy operator is −(ħ²/2m) d²/dx². Apply it to e^(ikx). Which classical formula appears if p = ħk?

### 4.20 The Laplacian in spherical coordinates

**Checks**

- [ ] I can use the radial part ∇²f = (1/r²) d/dr (r² df/dr) for functions of r alone.

**Exercises**

1. Compute ∇² e^(−r).
2. Redo 4.19 Exercise 2 with the radial formula.
3. Show that ψ = e^(−r/a) solves −(ħ²/2m)∇²ψ − (ke²/r)ψ = Eψ only if a = ħ²/(mke²). Then find E. You have solved the hydrogen ground state (17.1).

### 4.21 Vector identities

**Checks**

- [ ] I can prove the standard identities in components.

**Exercises**

1. Prove ∇ · (∇ × A) = 0.
2. Prove ∇ × (∇f) = 0.
3. Use ∇ × (∇ × A) = ∇(∇ · A) − ∇²A on Maxwell's equations in empty space to get a wave equation. (You will redo this in 11.18.)

### 4.22 Gaussian integrals in n dimensions

**Checks**

- [ ] I can integrate e^(−x·Ax) using the determinant of A.

**Exercises**

1. Integrate e^(−(x² + y²)) over the whole plane.
2. Integrate e^(−(x² + 4y²)) over the plane.
3. Guess the general formula for n dimensions in terms of det A.
4. Apply it to A = [[2, 1], [1, 2]]. (Diagonalize first, as in 3.13.)

### 4.23 A full multivariable course

**Checks**

- [ ] I can do mixed multivariable problems without being told the method.

**Exercises**

1. Find the flux of F = (x², y², z²) out of the unit cube [0, 1]³ using the divergence theorem.
2. Find and classify the critical points of f = x³ + y³ − 3xy.
3. Find the volume of the region inside the sphere x² + y² + z² = 4 and above the cone z = √(x² + y²).

## Answer key

- **4.1:** 1. Circles around the origin 2. A saddle; hyperbolas 3. Steep ground 4. Along (5, −3).
- **4.2:** 1. 2xy + y cos(xy); x² + x cos(xy) 2. nR/V (hotter, more pressure); −nRT/V² (bigger volume, less pressure) 3. Both 6x²y 4. The wave equation with speed ω/k.
- **4.3:** 1. (2x, 2y) 2. (0, 0, −mg) 3. E = k r/r³, pointing outward with strength k/r² 4. Along (−6, −4).
- **4.4:** 1. ∇f = (4, 1), so (12 + 4)/5 = 3.2 2. Along (1, −4), along the contour 3. √17 ≈ 4.12.
- **4.5:** 1. cos³t − 2 cos t sin²t 2. 1 + 8t 3. cos θ ∂f/∂x + sin θ ∂f/∂y.
- **4.6:** 1. Minimum, saddle, maximum 2. [[2, 1], [1, 2]], eigenvalues 3 and 1: a minimum.
- **4.7:** 1. 25 at (5, 5) 2. The unit cube 3. (1, 2), at distance √5 4. All pᵢ = 1/n: no extra knowledge means a uniform distribution.
- **4.8:** 1. 1 2. 2/3 3. 1/3.
- **4.9:** 2. πR² 3. (∫e^(−x²))² = ∫∫ e^(−r²) r dr dθ = π 4. πab.
- **4.10:** 3. A = 1/√(πa³) 4. 1 − 5e⁻² ≈ 0.32 5. ⟨r⟩ = 1.5a.
- **4.10b:** 1. π sr 2. About 7 × 10⁻⁵ sr 3. About 8 × 10⁻⁶.
- **4.11:** 1. Rotation; source 2. (x, y) 3. Circles around the origin; straight outward.
- **4.12:** 1. 1 both ways (the field is the gradient of xy) 2. 2π 3. Gravity is conservative.
- **4.13:** 1. 3 2. 4π: field strength falls as 1/R² while area grows as R² 3. 4πR³.
- **4.14:** 1. 3 and 0 2. 0 and (0, 0, 2) 3. At the origin: a point source 4. Whirlpool: curl; tap: positive divergence; drain: negative divergence.
- **4.15:** 1. Both sides 2π 2. πab.
- **4.16:** 1. Both sides 2π 2. The curl of a gradient is zero 3. Stokes' theorem gives curl B = μ₀J.
- **4.17:** 1. ∫3 dV = 4πR³, matching.
- **4.18:** 1. Yes; x²y + y 2. No: its curl is −2 3. Only then does work depend on the endpoints alone.
- **4.19:** 1. 6 3. −2k² 5. ħ²k²/2m = p²/2m.
- **4.20:** 1. e^(−r)(1 − 2/r) 3. The 1/r terms cancel when a = ħ²/(mke²); then E = −ħ²/(2ma²) = −ke²/(2a) ≈ −13.6 eV.
- **4.21:** 3. ∇²E = μ₀ε₀ ∂²E/∂t².
- **4.22:** 1. π 2. π/2 3. π^(n/2)/√(det A) 4. π/√3.
- **4.23:** 1. The integral of 2(x + y + z) over the cube = 3 2. (0, 0) saddle; (1, 1) minimum with f = −1 3. (16π/3)(1 − 1/√2) ≈ 4.91.