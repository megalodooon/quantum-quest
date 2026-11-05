# Part 2 workbook: single-variable calculus

By the end you will have normalized a quantum wavefunction and derived the Gaussian integral yourself.

### 2.1 The essence of calculus

**Checks**

- [ ] I can explain how slicing a circle into rings gives the area πr².
- [ ] I can explain derivatives and integrals as two sides of one idea.

**Exercises**

1. A thin ring of radius r and thickness dr has area about 2πr dr. Unroll all the rings from 0 to R into a triangle and find its area.
2. Repeat for a ball: a shell of radius r has area 4πr² and thickness dr. Guess the volume of a ball of radius R.
3. A car's speed is 2t m/s. Estimate the distance covered in 3 s by adding 1-second rectangles, once using the speed at the start of each second and once at the end. The true answer lies between. Guess it.

### 2.2 Limits

**Checks**

- [ ] I can find limits by algebra and by making a table of values.
- [ ] I can spot when a limit does not exist.

**Exercises**

1. The limit of (x² − 4)/(x − 2) as x → 2
2. Make a table of sin x/x for x = 0.1, 0.01, 0.001. What is the limit as x → 0?
3. The limit of (3x² + 1)/(x² − 5) as x → ∞
4. Does 1/x have a limit as x → 0? Look from both sides.
5. Which number does (1 + 1/n)ⁿ approach? (You met it in 1.15.)

### 2.3 The precise definition of a limit

**Checks**

- [ ] I can state the epsilon-delta definition and use it on a simple function.

**Exercises**

1. Prove that 2x + 1 → 7 as x → 3 by finding δ in terms of ε.
2. For x² → 4 as x → 2, find a δ that works for ε = 0.01.
3. Explain in words why sin(1/x) has no limit as x → 0.

### 2.4 Continuity

**Checks**

- [ ] I can tell removable gaps, jumps and infinite breaks apart.
- [ ] I can use the intermediate value theorem.

**Exercises**

1. (x² − 1)/(x − 1) is undefined at x = 1. What value fills the gap?
2. Show that x³ − x − 1 = 0 has a solution between 1 and 2.
3. f(x) = kx + 1 for x < 2 and x² for x ≥ 2. Which k makes f continuous?

### 2.5 Derivatives from first principles

**Checks**

- [ ] I can compute a derivative directly from the limit definition.

**Exercises**

1. Show d/dx x² = 2x from the definition.
2. Show d/dx x³ = 3x².
3. Show d/dx (1/x) = −1/x².
4. Estimate the slope of 2ˣ at x = 0 using (2^0.001 − 1)/0.001. Compare with ln 2 ≈ 0.693.

### 2.5b Leibniz notation

**Checks**

- [ ] I can read dy/dx and d²y/dx² and use dx as a tiny change.

**Exercises**

1. For y = x³, find dy/dx and d²y/dx².
2. Position is x = 5t². What do dx/dt and d²x/dt² mean physically, and what are they?
3. Use dA = 2πr dr to estimate how much a circle's area grows when r goes from 10 to 10.01.
4. A balloon's radius grows 2 cm/s. How fast is its volume growing when r = 10 cm? Use dV/dt = (dV/dr)(dr/dt).

### 2.6 Power, product and quotient rules

**Checks**

- [ ] I can differentiate any polynomial, product and quotient.

**Exercises**

1. d/dx (4x⁵ − 3x² + 7)
2. d/dx √x
3. d/dx [x²(3x + 1)] two ways: product rule, then expanding first.
4. d/dx [x/(x² + 1)]
5. d/dx x⁻³

### 2.7 The chain rule

**Checks**

- [ ] I can differentiate compositions of any depth.

**Exercises**

1. d/dx sin(x²)
2. d/dx (3x + 1)⁵
3. d/dx e^(−x²), the Gaussian you will meet everywhere in quantum mechanics.
4. d/dx √(1 − x²)
5. Differentiate e^(iωt) with respect to t. Why does this make complex exponentials so convenient for waves?

### 2.8 Derivatives of sin, cos, eˣ and ln x

**Checks**

- [ ] I know these four derivatives and can combine them with the other rules.

**Exercises**

1. d/dx (x ln x)
2. d/dx (eˣ sin x)
3. Show that y = sin x satisfies d²y/dx² = −y. (This is the harmonic oscillator equation of 5.5.)
4. d/dx ln(cos x)
5. Show d/dx aˣ = aˣ ln a by writing aˣ = e^(x ln a). Does this agree with 2.5 Exercise 4?

### 2.9 Implicit differentiation

**Checks**

- [ ] I can differentiate relations that are not solved for y.

**Exercises**

1. For x² + y² = 25, find dy/dx and the slope at (3, 4).
2. For xy = 1, find dy/dx.
3. Derive d/dx ln x = 1/x from e^y = x.
4. Derive d/dx arcsin x.

### 2.10 Related rates

**Checks**

- [ ] I can link the rates of change of connected quantities.

**Exercises**

1. A 5 m ladder slides down a wall. Its foot moves away at 1 m/s. How fast does the top drop when the foot is 3 m out?
2. A ripple's radius grows 0.5 m/s. How fast does the circle's area grow when r = 4 m?

### 2.11 Position, velocity and acceleration

**Checks**

- [ ] I can move between x(t), v(t) and a(t) by differentiating.

**Exercises**

1. x(t) = t³ − 6t² + 9t. Find v(t), a(t) and the times when the object stops.
2. During which times does it move backwards?
3. A dropped stone has height x = 20 − 5t². Find its velocity and acceleration.
4. The third derivative of position is called jerk. Find it for x = t⁴.

### 2.12 Optimization

**Checks**

- [ ] I can find maxima and minima and confirm them with the second derivative.

**Exercises**

1. A rectangle has perimeter 40. What shape gives the largest area?
2. Cut equal squares of side x from the corners of a 12 × 12 sheet and fold up an open box. Which x gives the largest volume?
3. Find and classify the stationary points of x³ − 3x.
4. Light goes from A in air (speed v₁) to B in water (speed v₂). Write the total time as a function of where it crosses the surface and minimize it. Show this gives sin θ₁/v₁ = sin θ₂/v₂ (Snell's law from Fermat's principle).

### 2.13 Linear approximation

**Checks**

- [ ] I can use f(x + dx) ≈ f(x) + f′(x) dx and (1 + x)ⁿ ≈ 1 + nx.

**Exercises**

1. Estimate √101.
2. Estimate 1.002¹⁰⁰, then compare with a calculator.
3. In relativity, γ = 1/√(1 − v²/c²) ≈ 1 + v²/(2c²). Estimate γ for v = 0.1c.
4. A pendulum swings to 5°. How large is the error in using sin θ ≈ θ?

### 2.14 L'Hôpital's rule

**Checks**

- [ ] I can evaluate 0/0 and ∞/∞ limits.

**Exercises**

1. The limit of sin x/x as x → 0
2. The limit of (1 − cos x)/x² as x → 0
3. The limit of x/eˣ as x → ∞
4. The limit of x ln x as x → 0 from above
5. The limit of x¹⁰⁰/2ˣ as x → ∞. Connect it with 1.15b.

### 2.15 Riemann sums

**Checks**

- [ ] I can approximate an integral with rectangles and take the limit.

**Exercises**

1. Estimate the area under x² from 0 to 1 with 4 right-hand rectangles.
2. With n rectangles, use 1² + 2² + … + n² = n(n + 1)(2n + 1)/6 to show the sum tends to 1/3.
3. A car moves at 3 m/s for 10 s. Show the area under its v-t graph is its distance.

### 2.16 The fundamental theorem of calculus

**Checks**

- [ ] I can explain why integration undoes differentiation, with a picture.

**Exercises**

1. Integrate 3x² from 0 to 2.
2. Find d/dx of the integral of e^(−t²) from 0 to x. (No formula exists for the integral itself.)
3. Velocity is v(t) = 4t. How far does the object go from t = 0 to t = 3?

### 2.17 Antiderivatives

**Checks**

- [ ] I can integrate basic functions and remember the constant.

**Exercises**

1. ∫ x⁴ dx
2. ∫ (3x² − 4x + 5) dx
3. ∫ cos x dx, ∫ eˣ dx and ∫ (1/x) dx
4. ∫ e^(3x) dx
5. A stone falls from 100 m with acceleration −9.8 m/s², starting at rest. Integrate twice to find x(t), then find when it lands.

### 2.17b Numerical integration

**Checks**

- [ ] I can apply the trapezoid rule and Simpson's rule.

**Exercises**

1. Apply the trapezoid rule with 4 strips to the integral of x² from 0 to 1.
2. Apply Simpson's rule with 4 strips to the same integral. Why is it exact?
3. Apply Simpson's rule with 2 strips to the integral of e^(−x²) from 0 to 1 (true value 0.7468).
4. Write a 5-line Python loop for the trapezoid rule and test it on sin x from 0 to π.

### 2.18 Substitution

**Checks**

- [ ] I can spot an inner function and its derivative and substitute.

**Exercises**

1. ∫ 2x(x² + 1)⁵ dx
2. ∫ x e^(−x²) dx
3. ∫ sin x cos x dx
4. Integrate sin x from 0 to π.
5. ∫ tan x dx

### 2.19 Integration by parts

**Checks**

- [ ] I can choose u and dv well and use parts more than once.

**Exercises**

1. ∫ x eˣ dx
2. ∫ x sin x dx
3. ∫ ln x dx
4. Integrate x e⁻ˣ from 0 to ∞.
5. Prove by induction that the integral of xⁿ e⁻ˣ from 0 to ∞ equals n!.
6. ∫ eˣ sin x dx (parts twice, then solve for the integral).

### 2.20 Partial fractions

**Checks**

- [ ] I can split a rational function into simple pieces and integrate them.

**Exercises**

1. Split 1/(x² − 1) and integrate it.
2. ∫ (3x + 5)/((x + 1)(x + 2)) dx
3. Use 1/(k(k + 1)) = 1/k − 1/(k + 1) to sum 1/(1×2) + 1/(2×3) + 1/(3×4) + … forever.

### 2.21 Trigonometric substitution

**Checks**

- [ ] I can handle √(a² − x²) and 1/(1 + x²) integrals.

**Exercises**

1. ∫ 1/√(1 − x²) dx
2. Integrate √(1 − x²) from 0 to 1. What shape's area is this?
3. Integrate 1/(1 + x²) over the whole real line. (This curve is the shape of a spectral line.)

### 2.22 Improper integrals

**Checks**

- [ ] I can integrate to infinity and decide when the answer is finite.
- [ ] I can normalize a simple wavefunction.

**Exercises**

1. Integrate 1/x² from 1 to ∞.
2. Show that the integral of 1/x from 1 to ∞ is infinite.
3. Integrate e^(−ax) from 0 to ∞.
4. Find A so that the integral of A²e^(−2|x|) over all x is 1. You have normalized the wavefunction ψ = Ae^(−|x|).
5. Gabriel's horn: rotate y = 1/x for x ≥ 1 about the x-axis. Show its volume is π even though its surface area is infinite.

### 2.23 The Gaussian integral

**Checks**

- [ ] I can prove that the integral of e^(−x²) over all x is √π.

**Exercises**

1. Prove it by squaring the integral and switching to polar coordinates.
2. Show the integral of e^(−ax²) is √(π/a).
3. Normalize ψ(x) = A e^(−x²/2), the ground state of the quantum harmonic oscillator.
4. Differentiate Exercise 2 with respect to a to find the integral of x²e^(−x²).
5. Explain where the 1/(σ√(2π)) in the normal distribution comes from.

### 2.24 Even and odd functions

**Checks**

- [ ] I can tell even from odd functions and use symmetry to skip integrals.

**Exercises**

1. Even, odd or neither: x³, cos x, eˣ, x sin x, sin x cos x.
2. Integrate x³ cos x from −5 to 5 without calculating.
3. Split eˣ into an even part and an odd part. (You will meet them again in 2.26.)
4. A probability density |ψ|² is symmetric about 0. What is the average position, and why?

### 2.25 Average value of a function

**Checks**

- [ ] I can compute plain and weighted averages with integrals.

**Exercises**

1. Find the average of x² on [0, 3].
2. Find the average of sin²x over one period.
3. A probability density is p(x) = 2x on [0, 1]. Find the average x.
4. Mains voltage is quoted as 230 V, which is the root-mean-square value. What is the peak voltage?

### 2.26 Hyperbolic functions

**Checks**

- [ ] I can use sinh, cosh and tanh and their derivatives.

**Exercises**

1. Show cosh²x − sinh²x = 1.
2. Find the derivatives of sinh x and cosh x.
3. What do tanh x tend to as x → ±∞?
4. Show cos(ix) = cosh x using Euler's formula.
5. A hanging chain follows y = a cosh(x/a). Sketch it for a = 1 and a = 3.

### 2.27 Convergence of series

**Checks**

- [ ] I can decide whether a series converges using comparison and ratio tests.

**Exercises**

1. Show that 1 + 1/2 + 1/3 + 1/4 + … grows without limit by grouping terms.
2. Does 1 + 1/4 + 1/9 + 1/16 + … converge? (It equals π²/6, proved in 3Blue1Brown's Basel problem video.)
3. Use the ratio test on the sum of n/2ⁿ.
4. Stack identical books so each overhangs the one below by the most it can. The overhangs are 1/2, 1/4, 1/6, … of a book length. Can the top book stick out more than 3 book lengths?

### 2.28 Power series

**Checks**

- [ ] I can find a radius of convergence and differentiate or integrate a series term by term.

**Exercises**

1. Find the radius of convergence of the sum of xⁿ and of the sum of xⁿ/n!.
2. Expand 1/(1 + x²) as a series, integrate term by term to get arctan x, and conclude π/4 = 1 − 1/3 + 1/5 − …
3. Differentiate the sum of xⁿ to find the sum of n xⁿ⁻¹, then evaluate the sum of n/2ⁿ.

### 2.29 Taylor series

**Checks**

- [ ] I can write Taylor series for eˣ, sin x, cos x and ln(1 + x).
- [ ] I can explain why every smooth potential looks like a parabola near its minimum.

**Exercises**

1. Write the series for eˣ, sin x and cos x around 0.
2. Write the series for ln(1 + x).
3. Use cos x ≈ 1 − x²/2 at x = 0.1. How big is the error?
4. Expand √(1 + x) to second order.
5. Expand mc²/√(1 − v²/c²) in powers of v. Which familiar formula appears in the second term?
6. Expand any V(x) around a minimum x₀ to second order. Why does this mean almost everything oscillates?

### 2.30 Euler's formula from series

**Checks**

- [ ] I can derive e^(iθ) = cos θ + i sin θ from the series.

**Exercises**

1. Put iθ into the eˣ series and collect real and imaginary parts.
2. Add the first 10 terms of the series for e^(iπ) by hand or in code. How close to −1 do you get?
3. Find d/dθ of e^(iθ) and show it is always at right angles to e^(iθ). What motion does that describe?

### 2.31 Arc length and volumes of revolution

**Checks**

- [ ] I can set up arc-length and volume integrals.

**Exercises**

1. Rotate y = √x from 0 to 4 about the x-axis and find the volume.
2. Find the arc length of y = x^(3/2) from 0 to 4.
3. Derive the volume of a ball by rotating a semicircle.

### 2.32 A full calculus course

**Checks**

- [ ] I can do a mixed set of problems without knowing which technique each needs.

**Exercises**

1. Pick the 10 problems you found hardest in this part and redo them without notes.
2. d/dx [x² e⁻ˣ sin x]
3. Integrate sin³x from 0 to π/2.
4. ∫ x² ln x dx
5. Final challenge: integrate x²e^(−x²) from 0 to ∞.

## Answer key

- **2.1:** 1. ½ × R × 2πR = πR² 2. (4/3)πR³ 3. 6 m and 12 m; exactly 9 m.
- **2.2:** 1. 4 2. 1 3. 3 4. No: −∞ from the left, +∞ from the right 5. e.
- **2.3:** 1. δ = ε/2 2. δ = 0.002 works (near 2, |x + 2| < 5) 3. It swings between −1 and 1 infinitely often near 0.
- **2.4:** 1. 2 2. f(1) = −1 < 0 and f(2) = 5 > 0 3. k = 3/2.
- **2.5:** 1. ((x + h)² − x²)/h = 2x + h → 2x 4. About 0.6934.
- **2.5b:** 1. 3x² and 6x 2. Velocity 10t and acceleration 10 3. About 0.628 4. 4πr² × 2 = 800π ≈ 2,513 cm³/s.
- **2.6:** 1. 20x⁴ − 6x 2. 1/(2√x) 3. 9x² + 2x 4. (1 − x²)/(x² + 1)² 5. −3x⁻⁴.
- **2.7:** 1. 2x cos(x²) 2. 15(3x + 1)⁴ 3. −2x e^(−x²) 4. −x/√(1 − x²) 5. iω e^(iωt): differentiating just multiplies by iω.
- **2.8:** 1. ln x + 1 2. eˣ(sin x + cos x) 3. sin″ = −sin 4. −tan x 5. Yes: ln 2 ≈ 0.693.
- **2.9:** 1. −x/y; −3/4 2. −y/x 3. e^y y′ = 1, so y′ = 1/x 4. 1/√(1 − x²).
- **2.10:** 1. 3/4 m/s 2. 4π ≈ 12.6 m²/s.
- **2.11:** 1. v = 3t² − 12t + 9, a = 6t − 12; stops at t = 1 and t = 3 2. Between t = 1 and t = 3 3. v = −10t, a = −10 4. 24t.
- **2.12:** 1. A 10 × 10 square, area 100 2. x = 2, volume 128 3. Maximum at x = −1, minimum at x = 1.
- **2.13:** 1. 10.05 2. About 1.2 (exact 1.2214) 3. About 1.005 4. sin(0.0873) = 0.08716: about 0.13% error.
- **2.14:** 1. 1 2. 1/2 3. 0 4. 0 5. 0.
- **2.15:** 1. 30/64 ≈ 0.469 3. 30 m.
- **2.16:** 1. 8 2. e^(−x²) 3. 18.
- **2.17:** 1. x⁵/5 + C 2. x³ − 2x² + 5x + C 3. sin x, eˣ, ln|x| (each + C) 4. e^(3x)/3 + C 5. x = 100 − 4.9t²; lands after about 4.52 s.
- **2.17b:** 1. 0.34375 2. 0.3333: Simpson's rule is exact for cubics and below 3. About 0.7472.
- **2.18:** 1. (x² + 1)⁶/6 + C 2. −½e^(−x²) + C 3. sin²x/2 + C 4. 2 5. −ln|cos x| + C.
- **2.19:** 1. (x − 1)eˣ + C 2. sin x − x cos x + C 3. x ln x − x + C 4. 1 6. eˣ(sin x − cos x)/2 + C.
- **2.20:** 1. ½[1/(x − 1) − 1/(x + 1)]; ½ ln|(x − 1)/(x + 1)| + C 2. 2 ln|x + 1| + ln|x + 2| + C 3. 1.
- **2.21:** 1. arcsin x + C 2. π/4, a quarter of the unit disc 3. π.
- **2.22:** 1. 1 2. ln x grows without bound 3. 1/a 4. A = 1 5. Volume π∫ dx/x² = π.
- **2.23:** 2. Substitute u = √a x 3. A = π^(−1/4) 4. √π/2 5. It is 1 over the Gaussian integral with a = 1/(2σ²).
- **2.24:** 1. odd, even, neither, even, odd 2. 0 3. eˣ = cosh x + sinh x 4. 0: positive and negative x cancel.
- **2.25:** 1. 3 2. 1/2 3. 2/3 4. About 325 V.
- **2.26:** 2. cosh x and sinh x 3. +1 and −1 4. cos(ix) = (e^(−x) + e^x)/2.
- **2.27:** 1. 1/3 + 1/4 > 1/2, the next four > 1/2, and so on 2. Yes 3. Ratio tends to 1/2 < 1: converges (to 2) 4. Yes: the harmonic series grows without limit, so any overhang is possible.
- **2.28:** 1. 1 and ∞ 2. 1 − x² + x⁴ − …; arctan x = x − x³/3 + x⁵/5 − …; set x = 1 3. 1/(1 − x)²; 2.
- **2.29:** 2. x − x²/2 + x³/3 − … 3. cos(0.1) = 0.995004 against 0.995: error 4 × 10⁻⁶ 4. 1 + x/2 − x²/8 5. mc² + ½mv² + …: kinetic energy 6. V(x₀) + ½V″(x₀)(x − x₀)²: a spring.
- **2.30:** 2. About −1.0000 after 10 terms (error under 10⁻³) 3. i e^(iθ): velocity at 90° to position gives circular motion.
- **2.31:** 1. 8π 2. (8/27)(10^(3/2) − 1) ≈ 9.07 3. π∫(R² − x²) dx from −R to R = (4/3)πR³.
- **2.32:** 2. e⁻ˣ(2x sin x − x² sin x + x² cos x) 3. 2/3 4. x³ ln x/3 − x³/9 + C 5. √π/4.