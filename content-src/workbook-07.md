# Part 7 workbook: advanced math for quantum theory

Come back here when Parts 16 and 20 ask for it. Highlight: in 7.11 you show that turning an electron by 360° multiplies its state by −1.

### 7.1 Hilbert space

**Checks**

- [ ] I can say which functions are square-integrable and why that matters.

**Exercises**

1. Is e^(−x²) square-integrable on ℝ? Is 1/x on [1, ∞)? Is the constant 1 on ℝ?
2. Is a plane wave e^(ikx) in L²(ℝ)? Why do physicists use it anyway?
3. Check that ⟨f, g⟩ = ∫ f*(x) g(x) dx satisfies the inner product rules.
4. Show that √2 sin(nπx), n = 1, 2, 3, …, is an orthonormal set on [0, 1].

### 7.2 Functional analysis

**Checks**

- [ ] I can explain norms, completeness and bounded operators.

**Exercises**

1. Give a sequence of rationals whose limit is not rational. What does this say about completeness?
2. Find the L² norm of f(x) = x on [0, 1].
3. Does fₙ(x) = sin(nx)/n tend to 0 in L²[0, π]?
4. Show that multiplying by sin x is a bounded operator on L²[0, π]. What is its norm?

### 7.3 Differential operators as matrices

**Checks**

- [ ] I can write a derivative on a grid as a matrix.

**Exercises**

1. Write the central-difference matrix for d/dx on 5 grid points with spacing h (zero outside).
2. Write d²/dx² as the tridiagonal matrix with −2 on the diagonal and 1 beside it (divided by h²). How does this connect to 5.34?
3. Using integration by parts, show d/dx is anti-Hermitian on functions vanishing at the ends, so −i d/dx is Hermitian.

### 7.4 Self-adjoint and unbounded operators

**Checks**

- [ ] I can explain why position and momentum need care.

**Exercises**

1. Show p = −iħ d/dx is symmetric on functions that vanish at ±∞.
2. On [0, 1] with ψ(0) = ψ(1) = 0, does p have any eigenfunctions? Why is that strange?
3. Show ψ with |ψ|² = 1/(π(1 + x²)) is normalized but has infinite ⟨x²⟩.

### 7.5 Discrete and continuous spectrum

**Checks**

- [ ] I can tell bound states from scattering states.

**Exercises**

1. For a finite square well, which energies are discrete and which continuous?
2. For hydrogen, what physical situation do E < 0 and E > 0 describe?
3. Why are continuum states normalized with δ-functions instead of to 1?

### 7.6 Distributions

**Checks**

- [ ] I can manipulate δ and its derivatives under integrals.

**Exercises**

1. Show ∫ δ′(x) f(x) dx = −f′(0).
2. Show xδ(x) = 0.
3. Show δ(x² − a²) = [δ(x − a) + δ(x + a)]/(2|a|).
4. Differentiate |x| twice in the sense of distributions.

### 7.7 Rigged Hilbert space

**Checks**

- [ ] I can explain why |x⟩ is not a normalizable state but is still useful.

**Exercises**

1. In one paragraph, explain how ⟨x|x′⟩ = δ(x − x′) replaces normalization to 1.
2. Name the three spaces of a Gelfand triple and which kind of object lives in each.

### 7.8 Group theory

**Checks**

- [ ] I can check the group axioms and tell abelian from non-abelian groups.

**Exercises**

1. Is {1, −1, i, −i} a group under multiplication?
2. List the symmetries of an equilateral triangle. How many are there? Do they commute?
3. Are the integers a group under subtraction?
4. The Rubik's cube group has about 4.3 × 10¹⁹ elements. Why is it non-abelian?

### 7.9 Representations

**Checks**

- [ ] I can represent a group by matrices and compute characters.

**Exercises**

1. Represent {1, i, −1, −i} by 2 × 2 rotation matrices.
2. Represent the triangle symmetries by 3 × 3 permutation matrices.
3. Find the characters (traces) of that representation for each type of symmetry.

### 7.10 Lie groups and Lie algebras

**Checks**

- [ ] I can find generators and their commutators.

**Exercises**

1. Write the generator of rotations in the plane and exponentiate it (see 3.24).
2. Write the 3 × 3 generators Lx, Ly, Lz of 3D rotations and check [Lx, Ly] = Lz.
3. Rotate a book 90° about x then y, and then in the other order. Why do tiny rotations nearly commute but large ones don't?

### 7.11 SO(3), SU(2) and the double cover

**Checks**

- [ ] I can explain why SU(2) covers SO(3) twice.

**Exercises**

1. Compute e^(−iθσz/2) at θ = 2π and θ = 4π.
2. Do the plate trick (or belt trick). How does it show a 720° loop can be undone but a 360° one cannot?
3. How many parameters do SU(2) and SO(3) each have?

### 7.12 Spinors

**Checks**

- [ ] I can rotate a spinor and explain the sign flip.

**Exercises**

1. Rotate the spinor (1, 0) by 2π about z using 7.11 Exercise 1.
2. Write spin up along x as a spinor.
3. A global sign never shows up in probabilities. How can the 360° sign flip be measured? (See 23.27.)

### 7.13 Quaternions

**Checks**

- [ ] I can multiply quaternions and use them to rotate vectors.

**Exercises**

1. Using i² = j² = k² = ijk = −1, find ij and ji.
2. Rotate the vector i by 90° about the z-axis with q = cos 45° + k sin 45° and q i q*.
3. Show that i ↦ −iσx, j ↦ −iσy, k ↦ −iσz obeys the same rules.

### 7.14 SU(3)

**Checks**

- [ ] I can count SU(3) generators and combine triplets.

**Exercises**

1. How many generators does SU(n) have? Evaluate for n = 3. What particles correspond to them?
2. Mesons are a quark plus an antiquark: 3 ⊗ 3̄ = 8 ⊕ 1. Check the dimensions.
3. Baryons are three quarks: 3 ⊗ 3 ⊗ 3 = 10 ⊕ 8 ⊕ 8 ⊕ 1. Check the dimensions.

### 7.15 The Lorentz group

**Checks**

- [ ] I can write boosts with rapidity and count the generators.

**Exercises**

1. Write the 1+1D boost matrix with rapidity η using cosh and sinh.
2. Multiply two boosts and show the rapidities add (compare 1.24 and 2.26).
3. How many generators does the Lorentz group have, and what are they?

### 7.16 Tensors

**Checks**

- [ ] I can tell vectors from covectors by how they transform.

**Exercises**

1. Double the length of your basis vectors. What happens to the components of a vector? Of a gradient (covector)?
2. Write the metric of the plane in polar coordinates.
3. Contract T^{ij} with δ_{ij}. What do you get?

### 7.17 Index notation

**Checks**

- [ ] I can read and write expressions with repeated-index summation and the Levi-Civita symbol.

**Exercises**

1. Write a · b, A times x, and a × b in index notation.
2. Use ε_ijk ε_ilm = δ_jl δ_km − δ_jm δ_kl to prove a × (b × c) = b(a · c) − c(a · b).
3. What is δ_ii in 3D?

### 7.18 Covariant derivatives

**Checks**

- [ ] I can explain why derivatives need correcting in curved coordinates.

**Exercises**

1. Find the Christoffel symbols of the flat plane in polar coordinates.
2. Carry an arrow around a triangle on a globe, always keeping it "parallel". Does it come back the same?

### 7.19 Manifolds

**Checks**

- [ ] I can say what makes a space a manifold.

**Exercises**

1. Which are manifolds: a circle, a sphere, a torus, a figure-eight?
2. Why can't a single flat map cover the whole sphere?
3. A triangle on a sphere has three 90° angles. What fraction of the sphere does it cover? Check that the angle excess equals area/R².

### 7.20 Differential forms

**Checks**

- [ ] I can use the wedge product and exterior derivative.

**Exercises**

1. Show dx ∧ dy = −dy ∧ dx.
2. Compute d(x dy).
3. Explain how ∫ dw over a region = ∫ w over its boundary includes Green's, Stokes' and the divergence theorem.

### 7.21 Topology

**Checks**

- [ ] I can compute simple topological invariants.

**Exercises**

1. Compute V − E + F for a cube and for a tetrahedron.
2. What is the fundamental group of a circle, and what does the integer count?
3. Why is it impossible to comb a hairy ball flat everywhere?

### 7.22 Fiber bundles and gauge theory

**Checks**

- [ ] I can describe a non-trivial bundle and link it to gauge fields.

**Exercises**

1. Explain the Möbius strip as a line bundle over a circle. Why is it not just a cylinder?
2. In one paragraph, explain how the vector potential A acts as a connection and the Berry phase as a holonomy.

### 7.23 Clifford and geometric algebra

**Checks**

- [ ] I can use the anticommutation relations behind the Dirac matrices.

**Exercises**

1. Check that the Pauli matrices satisfy σᵢσⱼ + σⱼσᵢ = 2δᵢⱼ I.
2. For vectors a and b, the geometric product is ab = a · b + a ∧ b. Compute it for a = e₁ and b = e₁ + e₂.

### 7.24 Grassmann numbers

**Checks**

- [ ] I can integrate over anticommuting variables.

**Exercises**

1. If θ² = 0, write e^θ exactly.
2. Using ∫ dθ θ = 1 and ∫ dθ 1 = 0, compute ∫ dθ̄ dθ e^(−θ̄ a θ).
3. Compare with the ordinary Gaussian result √(π/a). What changed, and why does this make fermion path integrals give determinants?

### 7.25 Functional integration

**Checks**

- [ ] I can explain the path integral as a limit of many ordinary integrals.

**Exercises**

1. Split a path from 0 to T into N steps. How many ordinary integrals do you need?
2. Why is each step's integral Gaussian for a free particle?
3. What problem does rotating time to imaginary values (Wick rotation) fix?

### 7.26 Measure theory

**Checks**

- [ ] I can explain why some sets have measure zero.

**Exercises**

1. Show the rationals in [0, 1] have measure 0 by covering them with tiny intervals.
2. Show the Cantor set has measure 0 even though it is uncountable.
3. Why can't a Riemann integral handle the function that is 1 on rationals and 0 elsewhere?

### 7.27 C*-algebras

**Checks**

- [ ] I can describe a quantum state as a linear functional on observables.

**Exercises**

1. Check ‖A*A‖ = ‖A‖² for A = diag(2, 3i).
2. Show ω(A) = tr(ρA) is linear and gives ω(I) = 1 for a density matrix ρ.

### 7.28 Category theory

**Checks**

- [ ] I can name the parts of a category and give an example of a functor.

**Exercises**

1. Describe the category of sets: objects, arrows, composition, identities.
2. Why is "take the fundamental group" a functor?
3. Look up the ZX-calculus and draw a CNOT gate in it.

## Answer key

- **7.1:** 1. Yes; yes; no 2. No, it cannot be normalized; wave packets built from plane waves can 4. 2∫ sin(nπx) sin(mπx) dx = δₙₘ.
- **7.2:** 1. 1, 1.4, 1.41, 1.414, … tends to √2: ℚ is not complete 2. 1/√3 3. Yes: the norm is √(π/2)/n 4. Yes; norm 1.
- **7.3:** 2. It is exactly the matrix used there 3. ∫ f* g′ = −∫ f*′ g when the boundary terms vanish.
- **7.4:** 2. No: e^(ikx) cannot vanish at both ends, so p has no eigenvectors even though it is symmetric 3. ∫ x²/(π(1 + x²)) dx diverges.
- **7.5:** 1. Bound states below the rim are discrete; above it, continuous 2. A bound electron and an ionized one 3. Their norms are infinite.
- **7.6:** 1. Integrate by parts 4. 2δ(x).
- **7.7:** 2. The space of nice test functions, the Hilbert space, and its dual of distributions, where |x⟩ lives.
- **7.8:** 1. Yes 2. Six (3 rotations including identity, 3 reflections); no 3. No: no associativity 4. Turning two faces in different orders gives different results.
- **7.9:** 1. Rotations by 0°, 90°, 180°, 270° 3. Identity 3; rotations 0; reflections 1.
- **7.10:** 1. J = [[0, −1], [1, 0]]; e^(θJ) is the rotation by θ 3. The commutator is second order in the angles.
- **7.11:** 1. −I and I 3. 3 each.
- **7.12:** 1. −(1, 0) 2. (1, 1)/√2 3. By interfering a rotated beam with an unrotated one.
- **7.13:** 1. ij = k and ji = −k 2. j.
- **7.14:** 1. n² − 1 = 8: the gluons 2. 3 × 3 = 9 = 8 + 1 3. 27 = 10 + 8 + 8 + 1.
- **7.15:** 1. [[cosh η, sinh η], [sinh η, cosh η]] 2. The cosh and sinh addition formulas 3. Six: three rotations and three boosts.
- **7.16:** 1. Vector components halve; gradient components double 2. ds² = dr² + r² dθ² 3. The trace T^{ii}.
- **7.17:** 1. aᵢbᵢ; Aᵢⱼxⱼ; εᵢⱼₖ aⱼ bₖ 3. 3.
- **7.18:** 1. Γ^r_θθ = −r and Γ^θ_rθ = Γ^θ_θr = 1/r 2. No: it turns by the enclosed curvature.
- **7.19:** 1. All but the figure-eight 2. A sphere is not topologically a plane 3. One eighth; excess π/2 = (4πR²/8)/R².
- **7.20:** 2. dx ∧ dy.
- **7.21:** 1. 8 − 12 + 6 = 2 and 4 − 6 + 4 = 2 2. The integers, counting windings 3. A sphere has Euler characteristic 2, not 0.
- **7.23:** 2. ab = 1 + e₁ ∧ e₂.
- **7.24:** 1. 1 + θ 2. a 3. The a moved to the numerator; many variables give det(A) instead of 1/√det(A).
- **7.25:** 1. N − 1 2. The kinetic term is quadratic in the step 3. It turns oscillating phases into decaying exponentials.
- **7.26:** 1. Cover the n-th rational by an interval of length ε/2ⁿ: total ε 2. At step n the remaining length is (2/3)ⁿ.
- **7.27:** 1. Both equal 9 2. tr(ρ) = 1.