# Part 16 workbook: quantum mechanics, the formalism

Kets are written ∣ψ⟩, with ∣+⟩ = (∣0⟩ + ∣1⟩)/√2 and ∣−⟩ = (∣0⟩ − ∣1⟩)/√2. Highlight: in 16.43 you compute the famous 70% chance that a tritium atom's electron stays put when its nucleus suddenly turns into helium.

### 16.1 Dirac notation

**Checks**

- [ ] I can write kets, bras and brackets and compute overlaps.

**Exercises**

1. For ∣ψ⟩ = (1, i)/√2, write ⟨ψ∣ and check ⟨ψ∣ψ⟩ = 1.
2. Find ⟨0∣ψ⟩ and the probability of finding ∣0⟩.
3. Find ⟨+∣ψ⟩ and the probability of finding ∣+⟩.

### 16.1b Operators as matrices

**Checks**

- [ ] I can write any operator as a matrix of elements ⟨i∣A∣j⟩.

**Exercises**

1. Build the matrix of σx from its elements ⟨i∣σx∣j⟩.
2. Write σz in the basis {∣+⟩, ∣−⟩}. Which familiar matrix do you get?
3. In the oscillator energy basis, x only connects neighbouring levels. What does its matrix look like? (See 16.13.)

### 16.1c The completeness relation

**Checks**

- [ ] I can insert a sum of ∣n⟩⟨n∣ = 1 to change basis.

**Exercises**

1. Check ∣0⟩⟨0∣ + ∣1⟩⟨1∣ = I.
2. Show ⟨φ∣ψ⟩ equals the sum over n of ⟨φ∣n⟩⟨n∣ψ⟩.
3. Using ∫∣x⟩⟨x∣ dx = 1, explain why ψ(x) = ⟨x∣ψ⟩.

### 16.2 The postulates

**Checks**

- [ ] I can state every postulate.

**Exercises**

1. List the postulates in your own words.
2. Which postulate produces probabilities?
3. Which one seems strangest to you, and why?

### 16.3 Observables are Hermitian

**Checks**

- [ ] I can tell whether an operator can be an observable.

**Exercises**

1. Why must observables have real eigenvalues?
2. Is iσx an observable?
3. Is σx + σz an observable? Find its eigenvalues.

### 16.4 The measurement postulate

**Checks**

- [ ] I can compute outcome probabilities, averages and post-measurement states.

**Exercises**

1. The state (3∣0⟩ + 4∣1⟩)/5 is measured with σz. Give the probabilities and ⟨σz⟩.
2. Measure σx on ∣0⟩. Give the probabilities and ⟨σx⟩.
3. If the result was −1, what is the state afterwards?

### 16.5 Position and momentum operators

**Checks**

- [ ] I can apply p = −iħ d/dx and recognize its eigenfunctions.

**Exercises**

1. Apply p to e^(ikx).
2. Is sin(kx) a momentum eigenstate? What momenta does it contain?
3. Find ⟨p²⟩ for the box ground state and check ⟨p²⟩/2m equals E₁.

### 16.6 The canonical commutator

**Checks**

- [ ] I can derive and use [x, p] = iħ.

**Exercises**

1. Derive [x, p] = iħ by acting on a test function f(x).
2. Compute [x², p].
3. Show [p, f(x)] = −iħ f′(x).

### 16.7 The general uncertainty principle

**Checks**

- [ ] I can apply ΔAΔB ≥ ½|⟨[A, B]⟩|.

**Exercises**

1. For spin, find the bound on ΔSₓΔS_y in the state ∣↑⟩ and check that it is reached.
2. Can ΔAΔB = 0 for non-commuting A and B? Give an example.

### 16.8 Compatible observables

**Checks**

- [ ] I can tell which observables can be known together.

**Exercises**

1. Do L² and L_z commute? Lₓ and L_z?
2. For a free particle, H and p commute. What does that let you do?
3. Which four observables label hydrogen's states?

### 16.9 Position and momentum space

**Checks**

- [ ] I can move between ψ(x) and φ(p) with a Fourier transform.

**Exercises**

1. A Gaussian has width σ in x. What is its width in p? (Use 5.14.)
2. Why is the Gaussian the state with ΔxΔp exactly ħ/2?

### 16.10 Time evolution

**Checks**

- [ ] I can build U = e^(−iHt/ħ) and apply it.

**Exercises**

1. Why is U unitary?
2. A spin has H = (ħω/2)σz. Write U(t) and apply it to ∣+⟩.
3. After what time does ∣+⟩ return to itself (up to a phase)?

### 16.11 Schrödinger and Heisenberg pictures

**Checks**

- [ ] I can describe evolution either by moving states or by moving operators.

**Exercises**

1. Write the Heisenberg equation dA/dt = (i/ħ)[H, A].
2. For a free particle, find x(t) in the Heisenberg picture.

### 16.12 Ehrenfest's theorem

**Checks**

- [ ] I can show averages follow classical laws.

**Exercises**

1. Show d⟨x⟩/dt = ⟨p⟩/m and d⟨p⟩/dt = −⟨V′(x)⟩.
2. Why is ⟨V′(x)⟩ generally not V′(⟨x⟩)? For which potential are they equal?

### 16.13 Ladder operators

**Checks**

- [ ] I can solve the oscillator with a and a†.

**Exercises**

1. With a = (mωx + ip)/√(2mħω), show [a, a†] = 1.
2. Show H = ħω(a†a + ½).
3. Compute a†a†∣0⟩.
4. Find ⟨n∣x²∣n⟩.

### 16.14 Coherent states

**Checks**

- [ ] I can describe coherent states and their photon statistics.

**Exercises**

1. A coherent state obeys a∣α⟩ = α∣α⟩. What distribution do its photon counts follow? (See 6.8.)
2. If the average photon number is 100, what is its spread?
3. Why is laser light well described by coherent states?

### 16.15 Angular momentum algebra

**Checks**

- [ ] I can use [Lₓ, L_y] = iħL_z and ladder operators L±.

**Exercises**

1. Show [L², L_z] = 0 follows from the basic commutators.
2. Show [L_z, L₊] = ħL₊. What does L₊ do to m?
3. Why must l be a whole or half-whole number?

### 16.16 Orbital angular momentum

**Checks**

- [ ] I can use L² = ħ²l(l + 1) and L_z = mħ.

**Exercises**

1. For l = 1, find the length of L and the largest L_z. What is the smallest angle L can make with z?
2. How many m values are there for l = 3?

### 16.17 Spin one-half

**Checks**

- [ ] I can write spin states along any axis.

**Exercises**

1. Spin up along the direction (θ, φ) is (cos(θ/2), e^(iφ) sin(θ/2)). Check it for the x-axis.
2. A spin points up along an axis tilted 60° from z. What is the chance of measuring up along z?

### 16.18 The Bloch sphere

**Checks**

- [ ] I can place states on the Bloch sphere.

**Exercises**

1. Place ∣0⟩, ∣1⟩, ∣+⟩, ∣−⟩ and (∣0⟩ + i∣1⟩)/√2.
2. Where do orthogonal states sit relative to each other?
3. Where do mixed states (16.25) live?

### 16.19 Sequential Stern-Gerlach

**Checks**

- [ ] I can predict beams through a chain of magnets.

**Exercises**

1. N atoms in the z-up beam pass an x-magnet; keep x-up and send them through a z-magnet. How many come out up and down?
2. Remove the x-magnet. What comes out?

### 16.20 Larmor precession

**Checks**

- [ ] I can compute precession frequencies.

**Exercises**

1. Electrons precess at about 28 GHz per tesla. What frequency in Earth's 50 μT field?
2. Describe the motion of a tilted spin on the Bloch sphere.

### 16.21 Rabi oscillations

**Checks**

- [ ] I can predict flip probabilities under a resonant drive.

**Exercises**

1. The flip probability is sin²(Ωt/2). How long is a π pulse? A π/2 pulse?
2. Detuned by Δ, the maximum flip probability is Ω²/(Ω² + Δ²). What is it when Δ = Ω?

### 16.22 Adding angular momenta

**Checks**

- [ ] I can list the total angular momenta from combining two.

**Exercises**

1. Combine two spin-½. Which totals appear and how many states each?
2. Combine l = 1 with s = ½. Check the state count.
3. Combine 1 with 1.

### 16.23 Singlets and triplets

**Checks**

- [ ] I can write the triplet and singlet and their swap symmetry.

**Exercises**

1. Write the four states.
2. Which are symmetric under swapping the particles?
3. Find S₁ · S₂ in the triplet and singlet using S² = S₁² + S₂² + 2S₁ · S₂.

### 16.24 Selection rules from symmetry

**Checks**

- [ ] I can explain why some transitions are forbidden.

**Exercises**

1. Why can't hydrogen's 2s state decay straight to 1s by emitting one photon?
2. Why is 2p → 1s allowed?

### 16.25 Density matrices

**Checks**

- [ ] I can tell pure from mixed states.

**Exercises**

1. Write ρ for ∣+⟩ and for a 50/50 mixture of ∣0⟩ and ∣1⟩.
2. Compute tr(ρ²) for each.
3. Which measurement tells them apart?

### 16.26 Partial trace

**Checks**

- [ ] I can find the state of one half of a two-particle system.

**Exercises**

1. Trace out one qubit of (∣00⟩ + ∣11⟩)/√2.
2. Do the same for ∣0⟩⊗∣+⟩.
3. What does the first result say about the half you hold?

### 16.27 Schmidt decomposition

**Checks**

- [ ] I can measure entanglement with Schmidt coefficients.

**Exercises**

1. Find the entanglement entropy of (∣00⟩ + ∣11⟩)/√2.
2. Find it for (√3∣00⟩ + ∣11⟩)/2.
3. What does a product state look like?

### 16.28 Generalized measurements

**Checks**

- [ ] I can explain why POVMs go beyond projections.

**Exercises**

1. Can you perfectly tell ∣0⟩ from ∣+⟩ in one shot? What can a POVM do instead?
2. Why can a POVM on a qubit have three outcomes?

### 16.29 Open systems

**Checks**

- [ ] I can describe T₁ and T₂ decay.

**Exercises**

1. Under pure dephasing, what happens to the diagonal and off-diagonal parts of ρ?
2. What do T₁ and T₂ measure?

### 16.30 Symmetries and generators

**Checks**

- [ ] I can link symmetries to conserved quantities in quantum mechanics.

**Exercises**

1. Show e^(−ipa/ħ) shifts ψ(x) to ψ(x − a). (Use the Taylor series, 2.29.)
2. If [H, p] = 0, what is conserved?

### 16.31 Parity and time reversal

**Checks**

- [ ] I can use parity to simplify problems.

**Exercises**

1. For a box centred at 0, which states are even and which odd?
2. Why is ⟨x⟩ = 0 in any parity eigenstate?
3. What does time reversal do to a wavefunction?

### 16.32 Kramers degeneracy

**Checks**

- [ ] I can state Kramers' theorem and one consequence.

**Exercises**

1. State the theorem.
2. Why does it matter for topological insulators (17.58)?

### 16.33 The propagator

**Checks**

- [ ] I can use the propagator to evolve a state.

**Exercises**

1. Write the free-particle propagator.
2. Describe what happens to a state that starts as δ(x).

### 16.34 Deriving the path integral

**Checks**

- [ ] I can derive the path integral from time slices.

**Exercises**

1. Slice the time into N steps and insert completeness (16.1c) between them.
2. Show each slice contributes e^(iL dt/ħ).

### 16.35 The WKB approximation

**Checks**

- [ ] I can estimate tunneling and quantization semiclassically.

**Exercises**

1. Write the WKB tunneling factor.
2. Apply ∮ p dx = (n + ½)h to the oscillator. Is the result exact?

### 16.36 The variational principle

**Checks**

- [ ] I can estimate ground-state energies with trial functions.

**Exercises**

1. Use e^(−bx²) for the oscillator. What do you find?
2. A Gaussian trial function for hydrogen gives −(8/3π) × 13.6 eV. Evaluate it. Why is it above −13.6 eV?

### 16.37 Perturbation theory

**Checks**

- [ ] I can compute first- and second-order energy shifts.

**Exercises**

1. A box gets a uniform extra potential ε. What is the shift?
2. An oscillator gets an extra λx. Find the first-order shift, then the exact answer by completing the square.
3. Helium: ignoring electron repulsion gives −108.8 eV; first-order repulsion adds +34 eV. Compare with the measured −79.0 eV.

### 16.38 Degenerate perturbation theory

**Checks**

- [ ] I can split degenerate levels by diagonalizing.

**Exercises**

1. Two degenerate states are coupled by V. Diagonalize [[0, V], [V, 0]].
2. Why does hydrogen's n = 2 level show a linear Stark effect?

### 16.39 Fermi's golden rule

**Checks**

- [ ] I can use transition rates.

**Exercises**

1. Write the golden rule.
2. Why does it lead to exponential decay?

### 16.40 Selection rules

**Checks**

- [ ] I can tell allowed from forbidden transitions.

**Exercises**

1. Which are allowed: 3d → 2p, 3d → 1s, 3s → 2p, 2s → 1s?
2. Why must l change by 1?

### 16.41 The adiabatic theorem

**Checks**

- [ ] I can predict what slow and fast changes do.

**Exercises**

1. A box widens slowly from L to 2L. What happens to the ground-state energy?
2. What happens if it widens suddenly? (See 16.43.)

### 16.42 The Berry phase

**Checks**

- [ ] I can compute geometric phases for spin.

**Exercises**

1. A spin-½ follows a field around a cone of solid angle Ω. Its Berry phase is −Ω/2. Find it for a loop around the equator.
2. Which classical effect from 8.26 is a cousin of this?

### 16.43 The sudden approximation

**Checks**

- [ ] I can compute overlaps after sudden changes.

**Exercises**

1. A box suddenly doubles in width. What is the chance the particle ends in the new ground state?
2. Tritium beta-decays to helium-3. The 1s overlap between charges 1 and 2 is (2√2/3)³. What is the chance the electron stays in 1s?

### 16.44 Scattering cross sections

**Checks**

- [ ] I can explain what a cross section measures.

**Exercises**

1. What is the classical cross section of a hard sphere of radius a?
2. How big is a barn?
3. How does Rutherford's cross section depend on angle?

### 16.45 The Born approximation

**Checks**

- [ ] I can relate scattering to the Fourier transform of the potential.

**Exercises**

1. Why is the Born amplitude a Fourier transform of V?
2. How does electron scattering reveal the proton's size?

### 16.46 Partial waves

**Checks**

- [ ] I can explain s-wave scattering at low energy.

**Exercises**

1. Why does only l = 0 matter at low energy?
2. A hard sphere's low-energy quantum cross section is 4πa². Compare with Exercise 1 of 16.44.

### 16.47 Scattering resonances

**Checks**

- [ ] I can read lifetimes from resonance widths.

**Exercises**

1. What shape does a resonance peak have? (Compare 2.21 Exercise 3.)
2. Look up the Ramsauer-Townsend effect. What is strange about it?

### 16.48 Theoretical Minimum: quantum mechanics

**Checks**

- [ ] I can follow every lecture's main calculation.

**Exercises**

1. Redo the lecture's spin-measurement examples without notes.

### 16.49 MIT 8.05

**Checks**

- [ ] I can do the problem sets.

**Exercises**

1. Do the first three problem sets.

### 16.50 MIT 8.06

**Checks**

- [ ] I can do approximation-method problems.

**Exercises**

1. Do the problem sets on perturbation theory and WKB.

### 16.51 Griffiths-style lectures

**Checks**

- [ ] I can solve textbook problems end to end.

**Exercises**

1. A spin-½ starts up along z in a field along x with H = (ħω/2)σₓ. Find the chance of measuring down along z at time t.

## Answer key

- **16.1:** 1. (1, −i)/√2 2. 1/√2; 1/2 3. (1 + i)/2; 1/2.
- **16.1b:** 2. σₓ 3. Tridiagonal with √n entries beside an empty diagonal.
- **16.1c:** 3. Projecting onto ∣x⟩ picks the amplitude at x.
- **16.2:** 2. The Born rule.
- **16.3:** 1. Results of measurements are real 2. No: it is anti-Hermitian 3. Yes; ±√2.
- **16.4:** 1. 9/25 and 16/25; −7/25 2. 1/2 each; 0 3. ∣−⟩.
- **16.5:** 1. ħk e^(ikx) 2. No: equal parts +ħk and −ħk 3. (πħ/L)², matching E₁.
- **16.6:** 2. 2iħx.
- **16.7:** 1. ħ²/4, reached since each spread is ħ/2 2. Yes, if ⟨[A, B]⟩ = 0 in that state, for example Sₓ and S_y in an Sₓ eigenstate (bound 0).
- **16.8:** 1. Yes; no 2. Share eigenstates: plane waves 3. H, L², L_z, S_z.
- **16.9:** 1. ħ/(2σ) 2. It minimizes the Fourier width product.
- **16.10:** 1. H is Hermitian 2. U = diag(e^(−iωt/2), e^(iωt/2)): the state precesses about z 3. 2π/ω.
- **16.11:** 2. x(t) = x(0) + p t/m.
- **16.12:** 2. Only for potentials at most quadratic, like the oscillator.
- **16.13:** 3. √2∣2⟩ 4. (ħ/(2mω))(2n + 1).
- **16.14:** 1. Poisson 2. 10 3. Lasers emit classical-like waves with Poisson photon counts.
- **16.15:** 2. Raises m by 1 3. The ladder must stop at both ends.
- **16.16:** 1. √2 ħ; ħ; 45° 2. 7.
- **16.17:** 1. θ = 90°, φ = 0 gives (1, 1)/√2 2. cos² 30° = 3/4.
- **16.18:** 1. North pole, south pole, +x, −x, +y 2. Opposite points 3. Inside the ball.
- **16.19:** 1. N/4 up and N/4 down (N/2 were lost at the x-magnet) 2. All up.
- **16.20:** 1. About 1.4 MHz 2. It circles the field axis at fixed tilt.
- **16.21:** 1. π/Ω and π/(2Ω) 2. 1/2.
- **16.22:** 1. Spin 1 (3 states) and spin 0 (1) 2. 3/2 (4) + 1/2 (2) = 6 3. 2, 1, 0: 5 + 3 + 1 = 9.
- **16.23:** 2. The triplet 3. ħ²/4 and −3ħ²/4.
- **16.24:** 1. A photon must carry away one unit of angular momentum 2. l changes by 1.
- **16.25:** 1. ½[[1, 1], [1, 1]] and ½I 2. 1 and 1/2 3. σₓ: +1 always vs. 50/50.
- **16.26:** 1. ½I 2. ∣+⟩⟨+∣, pure 3. It is maximally uncertain on its own.
- **16.27:** 1. 1 bit 2. About 0.81 bits 3. A single Schmidt coefficient.
- **16.28:** 1. No; a POVM can be sometimes certain and otherwise say "don't know" 2. Its outcomes need not be orthogonal.
- **16.29:** 1. Diagonal stays; off-diagonals decay 2. Energy relaxation and loss of phase coherence.
- **16.30:** 2. Momentum.
- **16.31:** 1. Odd n even, even n odd (for the centred box) 2. |ψ|² is even 3. Takes its complex conjugate.
- **16.32:** 1. With time-reversal symmetry, half-integer-spin levels are at least doubly degenerate 2. It protects their edge states.
- **16.33:** 1. √(m/(2πiħt)) e^(im(x − x′)²/(2ħt)) 2. It spreads at once over all space.
- **16.35:** 1. e^(−2∫κ dx) 2. E = (n + ½)ħω: exact.
- **16.36:** 1. The exact ground state 2. About −11.5 eV; the variational estimate is always above the true value.
- **16.37:** 1. ε 2. First order 0; exact −λ²/(2mω²) 3. −74.8 eV against −79.0 eV.
- **16.38:** 1. ±V 2. Its 2s and 2p states are degenerate.
- **16.39:** 1. Γ = (2π/ħ)|V|²ρ 2. A constant rate means a constant fraction decays each moment.
- **16.40:** 1. Allowed, forbidden, allowed, forbidden 2. The photon carries one unit.
- **16.41:** 1. It stays in the ground state; the energy falls to a quarter 2. It ends in a superposition.
- **16.42:** 1. π 2. The Foucault pendulum.
- **16.43:** 1. 32/(9π²) ≈ 0.36 2. About 0.70.
- **16.44:** 1. πa² 2. 10⁻²⁸ m² 3. 1/sin⁴(θ/2).
- **16.45:** 2. The scattering deviates from a point charge's at large momentum transfer.
- **16.46:** 1. Higher l are kept away by the centrifugal barrier 2. Four times larger.
- **16.47:** 1. A Lorentzian 2. Noble-gas atoms become almost transparent to slow electrons.
- **16.51:** sin²(ωt/2).