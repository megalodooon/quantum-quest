# Part 5 workbook: differential equations, Fourier analysis, special functions, complex analysis

In 5.8 you will find that a vibrating string only allows energies in the ratio 1 : 4 : 9, exactly the particle-in-a-box energies of quantum mechanics.

### 5.1 Differential equations, a tourist's guide

**Checks**

- [ ] I can say what order and linearity mean for a differential equation.
- [ ] I can read a phase-space picture.

**Exercises**

1. Give the order and say linear or not: y″ + 3y′ + 2y = 0; y′ = y²; the pendulum θ″ = −(g/L) sin θ.
2. Sketch the phase space (θ, θ′) of a pendulum without friction, then with friction.
3. Take three Euler steps of θ″ = −sin θ by hand from θ = 1, θ′ = 0 with dt = 0.1 (update θ′ from θ, then θ from the old θ′).
4. Romeo's love R and Juliet's love J obey R′ = J and J′ = −R. Describe what happens over time.

### 5.2 Separable equations

**Checks**

- [ ] I can separate variables and integrate both sides.

**Exercises**

1. Solve dN/dt = −λN and link λ to the half-life T.
2. Solve dy/dx = xy.
3. Coffee at 90 °C cools in a 20 °C room as dT/dt = −0.1(T − 20) per minute. When is it 50 °C?
4. Solve the logistic equation dy/dt = y(1 − y).

### 5.3 Integrating factors

**Checks**

- [ ] I can solve y′ + p(x)y = q(x).

**Exercises**

1. y′ + y = eˣ
2. A capacitor charges as V′ + V/(RC) = V₀/(RC) with V(0) = 0. Find V(t).
3. y′ + 2xy = x

### 5.4 Constant-coefficient second-order equations

**Checks**

- [ ] I can use the characteristic equation, including complex and repeated roots.

**Exercises**

1. y″ − 3y′ + 2y = 0
2. y″ + 4y = 0
3. y″ + 2y′ + 5y = 0 (compare with 1.37 Exercise 3)
4. y″ − 2y′ + y = 0

### 5.5 The harmonic oscillator

**Checks**

- [ ] I can solve x″ = −ω²x with any starting conditions.

**Exercises**

1. Solve with x(0) = A and x′(0) = 0.
2. A 0.5 kg mass hangs on a 200 N/m spring. Find ω and the period.
3. Write the solution as the real part of C e^(iωt).
4. Show that ½kx² + ½mv² stays constant.

### 5.6 Damping and resonance

**Checks**

- [ ] I can tell under-, critically and over-damped motion apart.
- [ ] I can sketch a resonance curve.

**Exercises**

1. For x″ + 2γx′ + ω₀²x = 0, find the condition for each damping regime.
2. Which regime do car shock absorbers aim for, and why?
3. A driven oscillator has amplitude (F/m)/√((ω₀² − ω²)² + 4γ²ω²). Sketch it for small and large γ.
4. The Tacoma Narrows bridge collapse is often blamed on resonance. Look up why that explanation is incomplete.

### 5.7 Systems of equations

**Checks**

- [ ] I can solve x′ = Ax with eigenvectors and classify fixed points.

**Exercises**

1. Solve x′ = Ax for A = [[0, 1], [−1, 0]]. Compare with 3.24 Exercise 2.
2. Solve it for A = [[−1, 0], [0, −3]].
3. Two equal pendulums joined by a spring have normal modes along (1, 1) and (1, −1). Describe each motion.
4. Which eigenvalues give a saddle, a stable node, a spiral and a centre?

### 5.8 Boundary value problems

**Checks**

- [ ] I can explain how boundary conditions allow only discrete solutions.

**Exercises**

1. Solve y″ = −λy with y(0) = y(L) = 0. Which λ are allowed?
2. Show that λ ≤ 0 gives only y = 0.
3. For L = 1, list the first three λ and their ratios. (These are the particle-in-a-box energies of 15.12.)
4. Why does a guitar string sound a note plus overtones at 2, 3, 4 times its frequency?

### 5.9 The heat equation

**Checks**

- [ ] I can explain ∂T/∂t = α ∂²T/∂x² in words.

**Exercises**

1. Where on a temperature curve does the temperature fall, and where does it rise?
2. Check that e^(−αk²t) sin(kx) is a solution.
3. How much faster does sin(10x) fade than sin x?

### 5.10 Separation of variables

**Checks**

- [ ] I can turn a PDE into ODEs with a product guess.

**Exercises**

1. Put T = X(x)G(t) into the heat equation and separate.
2. A rod of length π with cold ends starts at T = sin x + 0.5 sin 3x. Write T(x, t).
3. Separate the 2D Laplace equation ∂²u/∂x² + ∂²u/∂y² = 0.

### 5.11 The wave equation

**Checks**

- [ ] I can solve the 1D wave equation with travelling and standing waves.

**Exercises**

1. Show that any f(x − ct) solves u_tt = c²u_xx.
2. Show sin(kx) cos(ωt) solves it when ω = ck.
3. A bump at rest is released. Describe what happens (d'Alembert's solution).
4. A guitar string is 0.65 m long and waves travel along it at 286 m/s. Find its lowest note.

### 5.11b Laplace and Poisson equations

**Checks**

- [ ] I know what ∇²V = 0 and ∇²V = −ρ/ε₀ describe.

**Exercises**

1. Show ln r solves the 2D Laplace equation away from the origin.
2. A solution of Laplace's equation equals the average of its values on any circle around a point. Why does this mean a soap film has no bumps?
3. Inside a uniformly charged ball, guess V(r) as a quadratic and fix it with Poisson's equation.

### 5.12 Fourier series

**Checks**

- [ ] I can compute Fourier coefficients and build a periodic function from sines.

**Exercises**

1. Derive the series of a square wave: (4/π)(sin x + sin 3x/3 + sin 5x/5 + …).
2. Evaluate it at x = π/2. Which series for π appears? (Compare 2.28.)
3. Plot the first 1, 3 and 20 terms. Where does the overshoot (Gibbs phenomenon) appear, and does it shrink?
4. Rewrite a Fourier series with e^(inx) terms.
5. Draw your initials with rotating circles using an online Fourier drawing tool.

### 5.13 The Fourier transform

**Checks**

- [ ] I can compute simple Fourier transforms and use an FFT in code.

**Exercises**

1. Show that the transform of e^(−x²/2) is again a Gaussian.
2. Find the transform of a box of width a. How does its width depend on a?
3. Make a signal of 440 + 554 + 659 Hz in Python and find the three peaks with an FFT.
4. What is the transform of e^(ik₀x)?

### 5.14 The uncertainty principle in Fourier analysis

**Checks**

- [ ] I can explain why a narrow signal must have a wide spectrum.

**Exercises**

1. A Gaussian has width σ in x. What is its width in k, and what is their product?
2. A beep lasts 1 ms. Roughly how spread out are its frequencies?
3. Multiply by ħ using p = ħk. Which famous inequality appears?
4. Why can a radar not measure a target's distance and speed perfectly with a single pulse?

### 5.15 Convolution

**Checks**

- [ ] I can convolve two distributions and use the convolution theorem.

**Exercises**

1. Convolve the distributions of two dice. What is P(sum = 7)?
2. Convolve a box with itself. What shape appears?
3. Multiply (1 + 2x)(3 + x) by convolving coefficient lists.
4. Explain blurring a photo as a convolution and as a product of Fourier transforms.

### 5.16 The Dirac delta

**Checks**

- [ ] I can integrate against δ(x) and see it as a limit of narrow peaks.

**Exercises**

1. Integrate δ(x − 2) x² over all x.
2. Show δ(2x) = ½δ(x).
3. Show that Gaussians of width σ and area 1 behave like δ(x) as σ → 0.
4. What is the derivative of the step function?
5. Use 5.13 Exercise 4 to argue that the integral of e^(ikx) over all k is 2πδ(x).

### 5.17 Parseval's theorem

**Checks**

- [ ] I can state Parseval's theorem and use it to sum a series.

**Exercises**

1. Apply Parseval to the square wave to find 1 + 1/9 + 1/25 + …
2. In quantum terms, what does Parseval say about total probability in position and momentum space?

### 5.18 The Laplace transform

**Checks**

- [ ] I can transform simple functions and solve an ODE with them.

**Exercises**

1. Transform 1, e^(at) and sin ωt.
2. Solve y′ + y = 0 with y(0) = 1.
3. Solve y″ + y = 0 with y(0) = 0 and y′(0) = 1.

### 5.19 Calculus of variations

**Checks**

- [ ] I can derive and apply the Euler-Lagrange equation.

**Exercises**

1. Derive the Euler-Lagrange equation for minimizing the integral of F(y, y′, x).
2. Show that the shortest path between two points is a straight line.
3. A soap film between two rings takes the shape of least area. Show the profile is y = a cosh(x/a) (see 2.26).
4. What curve gives the fastest slide under gravity (the brachistochrone)?

### 5.20 Sturm-Liouville theory

**Checks**

- [ ] I can explain why eigenfunctions of these operators are orthogonal.

**Exercises**

1. Show y″ + λy = 0 is a Sturm-Liouville problem.
2. Prove that two eigenfunctions with different λ are orthogonal, using integration by parts.
3. Write Legendre's equation (1 − x²)y″ − 2xy′ + l(l + 1)y = 0 in Sturm-Liouville form.

### 5.21 Orthogonal polynomials

**Checks**

- [ ] I can expand a function in an orthogonal polynomial basis.

**Exercises**

1. Check that x and (3x² − 1)/2 are orthogonal on [−1, 1].
2. Write x² as a combination of P₀ = 1 and P₂ = (3x² − 1)/2.
3. Which weight functions go with Hermite and Laguerre polynomials?

### 5.22 Legendre polynomials

**Checks**

- [ ] I can generate P₀ to P₃ and say where they appear.

**Exercises**

1. Generate P₀ to P₃ with Rodrigues' formula Pₙ = (1/(2ⁿ n!)) dⁿ/dxⁿ (x² − 1)ⁿ.
2. Check that Pₙ(1) = 1 for each.
3. 1/|r − r′| expands in powers of r′/r with Pₙ(cos θ) as coefficients. Which physics idea does this give? (See 11.30.)

### 5.23 Spherical harmonics

**Checks**

- [ ] I can link the Y_l^m to atomic orbital shapes.

**Exercises**

1. Check that Y₀⁰ = 1/√(4π) is normalized over the sphere.
2. Y₁⁰ is proportional to cos θ. Describe its shape. Which orbital is it?
3. How many Y_l^m are there for l = 2? Which orbitals are they?

### 5.24 Hermite polynomials

**Checks**

- [ ] I can build the harmonic oscillator wavefunctions from Hermite polynomials.

**Exercises**

1. Write H₀, H₁ and H₂.
2. Show ψ = x e^(−x²/2) satisfies −ψ″ + x²ψ = 3ψ. (This is the first excited oscillator state, in units where E = 2n + 1.)
3. Check that H₀ and H₂ are orthogonal with weight e^(−x²).

### 5.25 Laguerre polynomials

**Checks**

- [ ] I can say where Laguerre polynomials appear in hydrogen.

**Exercises**

1. Write L₀, L₁ and L₂.
2. The hydrogen 2s radial function is (2 − r/a) e^(−r/2a). Where is its node?

### 5.26 Bessel functions

**Checks**

- [ ] I can describe J₀ and why drums sound different from strings.

**Exercises**

1. Sketch J₀(x) and mark its first two zeros (2.405 and 5.520).
2. A drum's lowest modes have frequencies in the ratio of Bessel zeros. Why doesn't a drum sound a clean musical note like a string?

### 5.27 The gamma function

**Checks**

- [ ] I can use Γ(n) = (n − 1)! and compute Γ(1/2).

**Exercises**

1. Show Γ(n + 1) = nΓ(n) with integration by parts.
2. Show Γ(1/2) = √π using the Gaussian integral.
3. What is (1/2)!?
4. The volume of an n-dimensional ball is π^(n/2) Rⁿ/Γ(n/2 + 1). Check it for n = 2 and n = 3.

### 5.28 Green's functions

**Checks**

- [ ] I can explain a Green's function as the response to a point kick.

**Exercises**

1. Find the Green's function of d²/dx² on [0, 1] with zero ends.
2. The Green's function of ∇² in 3D is −1/(4πr). How does superposition then give the potential of any charge distribution?
3. Describe the response of a resting oscillator to a sudden hammer blow.

### 5.29 Complex differentiability

**Checks**

- [ ] I can test the Cauchy-Riemann equations.

**Exercises**

1. Check that z² satisfies the Cauchy-Riemann equations.
2. Is the conjugate z̄ complex-differentiable?
3. Show that the real and imaginary parts of z² each solve Laplace's equation.

### 5.30 Contour integration and residues

**Checks**

- [ ] I can evaluate real integrals with the residue theorem.

**Exercises**

1. Integrate 1/z around the unit circle.
2. Use the residue at i to integrate 1/(1 + x²) over the real line. Compare with 2.21.
3. Integrate 1/(1 + x⁴) over the real line.
4. Find the residue of e^z/z³ at 0.

### 5.31 The zeta function and analytic continuation

**Checks**

- [ ] I can explain what "1 + 2 + 3 + … = −1/12" really means.

**Exercises**

1. Add 1/n² for n up to 1000 in code and compare with π²/6.
2. In two sentences, explain why ζ(−1) = −1/12 is not the sum of 1 + 2 + 3 + …

### 5.32 Conformal maps

**Checks**

- [ ] I can describe how a complex function bends a grid while keeping angles.

**Exercises**

1. What does z ↦ z² do to horizontal and vertical grid lines?
2. Show that z ↦ z + 1/z sends the unit circle to a line segment. Which segment?

### 5.33 Numerical ODE solving

**Checks**

- [ ] I can implement Euler's method and RK4.

**Exercises**

1. Use Euler's method on y′ = y, y(0) = 1, to t = 1 with step 0.1. Compare with e.
2. Repeat with RK4. How big is the error now?
3. Simulate a pendulum with RK4 and plot θ(t) for a small and a large swing.

### 5.34 Solving the Schrödinger equation numerically

**Checks**

- [ ] I can turn −½ψ″ + Vψ = Eψ into a matrix and find its eigenvalues.

**Exercises**

1. Discretize −½ψ″ = Eψ on [0, 1] with ψ = 0 at both ends using 100 grid points, and find the lowest eigenvalues with numpy. Compare with n²π²/2.
2. Add V = 50(x − 0.5)² and plot the ground state.
3. Build a double well and look at the two lowest states. What do you notice about their energies? (This is tunneling splitting, see 23.9b.)

### 5.35 The logistic map

**Checks**

- [ ] I can explain period doubling and chaos.

**Exercises**

1. Iterate x → rx(1 − x) from 0.2 with r = 2.5. Where does it settle?
2. Repeat with r = 3.2.
3. Repeat with r = 3.9 for two starting points 0.2 and 0.2001.
4. Period doubling happens near r = 3, 3.449 and 3.544. Estimate the Feigenbaum ratio from these.

### 5.36 The Lorenz attractor

**Checks**

- [ ] I can explain sensitive dependence on initial conditions.

**Exercises**

1. Simulate the Lorenz system with σ = 10, ρ = 28, β = 8/3 and plot it in 3D.
2. Start two runs 10⁻⁸ apart. Plot their distance over time on a log scale.
3. What does this mean for weather forecasts?

### 5.37 Perturbation methods

**Checks**

- [ ] I can solve a problem as a series in a small parameter.

**Exercises**

1. Solve x² + εx − 1 = 0 for the positive root to first order in ε, then check against the exact formula.
2. Stirling's formula says ln n! ≈ n ln n − n + ½ ln(2πn). Test it at n = 10.
3. Why can a series that diverges still give excellent approximations if you stop early?

## Answer key

- **5.1:** 1. Second, linear; first, nonlinear; second, nonlinear 2. Closed loops (and swirls around the top); with friction, inward spirals 3. θ ≈ 1, 0.992, 0.975 and θ′ ≈ −0.084, −0.168, −0.252 4. They cycle forever: R = cos t, J = −sin t.
- **5.2:** 1. N = N₀e^(−λt); λ = ln 2/T 2. y = Ce^(x²/2) 3. After 10 ln(7/3) ≈ 8.5 minutes 4. y = 1/(1 + Ce^(−t)).
- **5.3:** 1. y = eˣ/2 + Ce⁻ˣ 2. V = V₀(1 − e^(−t/RC)) 3. y = 1/2 + Ce^(−x²).
- **5.4:** 1. Aeˣ + Be²ˣ 2. A cos 2x + B sin 2x 3. e⁻ˣ(A cos 2x + B sin 2x) 4. (A + Bx)eˣ.
- **5.5:** 1. x = A cos ωt 2. ω = 20 rad/s, period π/10 ≈ 0.31 s.
- **5.6:** 1. Underdamped γ < ω₀, critical γ = ω₀, overdamped γ > ω₀ 2. Close to critical: fastest return without bouncing 3. Small γ: tall narrow peak near ω₀; large γ: low broad hump 4. It was aeroelastic flutter, a self-exciting instability.
- **5.7:** 1. A rotation: x = (cos t, −sin t) times constants 2. x₁ = ae⁻ᵗ, x₂ = be⁻³ᵗ 3. In step; in opposition 4. Real, opposite signs: saddle; both negative: stable node; complex with negative real part: spiral; purely imaginary: centre.
- **5.8:** 1. λₙ = (nπ/L)², yₙ = sin(nπx/L) 3. π², 4π², 9π²: ratio 1 : 4 : 9 4. The allowed modes have frequencies n times the lowest.
- **5.9:** 1. It falls where the curve bends down (peaks) and rises where it bends up (dips) 3. 100 times faster.
- **5.10:** 1. G′/(αG) = X″/X = constant 2. T = e^(−αt) sin x + 0.5 e^(−9αt) sin 3x.
- **5.11:** 3. It splits into two half-height bumps moving apart 4. c/(2L) = 220 Hz, the note A3.
- **5.11b:** 2. No point can be higher than all its neighbours 3. V = (ρ/6ε₀)(3R² − r²).
- **5.12:** 2. π/4 = 1 − 1/3 + 1/5 − … 3. At the jumps; it stays about 9% and only gets narrower 4. f = sum of cₙ e^(inx).
- **5.13:** 1. √(2π) e^(−k²/2) 2. A sinc, (2/k) sin(ka/2), about 1/a wide 4. 2πδ(k − k₀).
- **5.14:** 1. 1/(2σ) in k as a standard deviation; product 1/2 2. About 1 kHz 3. Δx Δp ≥ ħ/2 4. A short pulse pins down distance but blurs frequency, and speed comes from the frequency shift.
- **5.15:** 1. 6/36 = 1/6 2. A triangle 3. (3, 7, 2): 3 + 7x + 2x².
- **5.16:** 1. 4 2. Substitute u = 2x 4. δ(x).
- **5.17:** 1. π²/8 2. It is the same in both.
- **5.18:** 1. 1/s, 1/(s − a), ω/(s² + ω²) 2. e⁻ᵗ 3. sin t.
- **5.19:** 1. ∂F/∂y − d/dx (∂F/∂y′) = 0 2. With F = √(1 + y′²), y″ = 0 4. A cycloid.
- **5.20:** 1. p = 1, q = 0, weight 1 3. ((1 − x²)y′)′ + l(l + 1)y = 0.
- **5.21:** 1. The integrand is odd 2. x² = (2/3)P₂ + (1/3)P₀ 3. e^(−x²) and e⁻ˣ.
- **5.22:** 1. 1, x, (3x² − 1)/2, (5x³ − 3x)/2 3. The multipole expansion.
- **5.23:** 1. (1/4π) × 4π = 1 2. Two lobes along z: the p_z orbital 3. Five: the five d orbitals.
- **5.24:** 1. 1, 2x, 4x² − 2 2. ψ″ = (x³ − 3x)e^(−x²/2), so −ψ″ + x²ψ = 3ψ 3. The integral of (4x² − 2)e^(−x²) is 2√π − 2√π = 0.
- **5.25:** 1. 1, 1 − x, (x² − 4x + 2)/2 2. r = 2a.
- **5.26:** 2. 5.520/2.405 ≈ 2.30 and the other modes are not whole-number multiples, so overtones clash.
- **5.27:** 2. Substitute t = u² 3. √π/2 4. πR² and (4/3)πR³.
- **5.28:** 1. G = x(s − 1) for x < s and s(x − 1) for x > s 2. Add up −1/(4πr) responses from every bit of charge 3. It rings as a decaying sine.
- **5.29:** 1. u = x² − y² and v = 2xy give u_x = v_y = 2x and u_y = −v_x = −2y 2. No.
- **5.30:** 1. 2πi 2. 2πi × 1/(2i) = π 3. π/√2 4. 1/2.
- **5.31:** 1. About 1.6439 against 1.6449 2. The sum diverges; −½ is the value of a smooth continuation of ζ to a point where the series makes no sense.
- **5.32:** 1. Hyperbolas (and parabolas from lines away from the axes) 2. The segment from −2 to 2.
- **5.33:** 1. 1.1¹⁰ ≈ 2.594 against 2.718 2. About 2 × 10⁻⁶.
- **5.34:** 1. About 4.93, 19.7, 44.4 3. The two lowest are nearly equal; the tiny gap is set by tunneling through the barrier.
- **5.35:** 1. 0.6 2. Alternates near 0.513 and 0.799 3. The two runs separate completely within a few dozen steps 4. 0.449/0.095 ≈ 4.7 (the true value is 4.669).
- **5.36:** 2. The distance grows exponentially until it is the size of the attractor 3. Long-range forecasts lose all detail.
- **5.37:** 1. x ≈ 1 − ε/2; exact (−ε + √(ε² + 4))/2 = 1 − ε/2 + ε²/8 − … 2. 15.096 against ln 10! = 15.104 3. The first terms shrink before they grow.