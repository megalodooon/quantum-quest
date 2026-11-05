# Part 15 workbook: quantum mechanics, the concepts

Use ħ = 1.055 × 10⁻³⁴ J·s, mₑ = 9.11 × 10⁻³¹ kg, and the handy fact that an electron in a 1 nm box has E₁ = 0.376 eV. Highlight: in 15.9 you show that if the electron really spun, its surface would move about 70 times faster than light.

### 15.1 The double slit with single electrons

**Checks**

- [ ] I can describe what builds up on the screen one electron at a time.

**Exercises**

1. Electrons are sent one at a time. What does the screen look like after 10 hits, after 10,000?
2. Add a detector that tells which slit each electron used. What happens to the pattern?
3. Where on the screen can an electron never land, and why?

### 15.2 Wave-particle duality

**Checks**

- [ ] I can name experiments that show each side of light and matter.

**Exercises**

1. Give one experiment showing light acts as a wave and one showing it acts as particles.
2. Do the same for electrons.
3. Is it right to say an electron "is" a wave? Argue both sides in two sentences each.

### 15.3 The wavefunction

**Checks**

- [ ] I can sketch ψ and |ψ|² and explain why ψ can be complex.

**Exercises**

1. What does |ψ|² look like for ψ = A e^(ikx)?
2. Can ψ be negative or complex? Can |ψ|²?
3. Sketch ψ and |ψ|² for ψ = sin(πx) and ψ = sin(2πx) on [0, 1].

### 15.4 The Born rule

**Checks**

- [ ] I can turn amplitudes into probabilities.

**Exercises**

1. A state has amplitude 0.6 to be at A and 0.8i to be at B. Find both probabilities.
2. Redo 1.43 Exercise 1 and say which case is bright, dark and half.
3. Why must all probabilities add to 1?

### 15.4b Normalizing a wavefunction

**Checks**

- [ ] I can find the normalization constant for any simple ψ.

**Exercises**

1. ψ = A on [0, L], zero elsewhere.
2. ψ = A x(L − x) on [0, L].
3. ψ = A e^(−|x|/a).
4. ψ = A e^(−x²/(2σ²)) (use 2.23).

### 15.5 Superposition

**Checks**

- [ ] I can read measurement probabilities from a superposition.

**Exercises**

1. ψ = (ψ₁ + ψ₂)/√2. What is the chance of finding state 1?
2. ψ = (√3 ψ₁ + ψ₂)/2. Find both probabilities.
3. Is a 50/50 superposition the same as a box that is 50% one thing and 50% the other? (See 16.25.)

### 15.5b Two-state systems

**Checks**

- [ ] I can handle photon polarization as the simplest quantum system.

**Exercises**

1. A photon is diagonal, D = (H + V)/√2. What is the chance it passes a horizontal polarizer?
2. A photon is cos θ H + sin θ V. What is the chance it passes a polarizer at angle φ? Compare with 9.24.
3. Spin up along x is (↑ + ↓)/√2 in the z basis. What is the chance of measuring up along z?

### 15.6 Measurement and collapse

**Checks**

- [ ] I can predict what repeated measurements give.

**Exercises**

1. You measure spin up along z, then measure z again. What do you get?
2. Next you measure along x. What are the odds?
3. Then measure z again. What are the odds now? What did the x measurement do?

### 15.7 The uncertainty principle

**Checks**

- [ ] I can use ΔxΔp ≥ ħ/2 to estimate energies and sizes.

**Exercises**

1. An electron is confined to 0.1 nm. Estimate its minimum momentum spread and the kinetic energy that implies, in eV. Compare with atomic energies.
2. Could an electron live inside a nucleus 10⁻¹⁴ m wide? Estimate pc in MeV.
3. A 1 μg dust grain is located to 1 μm. What is its minimum velocity uncertainty?

### 15.7b The Heisenberg microscope

**Checks**

- [ ] I can give Heisenberg's argument and say why it is incomplete.

**Exercises**

1. To see an electron with light of wavelength λ, you blur its position by about λ and kick it by about h/λ. Multiply them.
2. Why does uncertainty exist even if nobody measures anything?
3. Look up Ozawa's error-disturbance relation and the 2012 neutron experiment that tested it.

### 15.7c Energy-time uncertainty

**Checks**

- [ ] I can link lifetimes to energy spreads.

**Exercises**

1. An excited atom lives 10 ns. Estimate its energy spread in eV and its line width in MHz.
2. The Z boson's mass peak is 2.5 GeV wide. Estimate its lifetime.
3. Why is energy-time uncertainty different from position-momentum uncertainty?

### 15.8 Quantization

**Checks**

- [ ] I can explain why confined waves have discrete energies.

**Exercises**

1. How is a guitar string's set of notes like an atom's set of energies? (See 5.8.)
2. Is a free electron's energy quantized?
3. What sets how far apart the levels are?

### 15.9 Spin

**Checks**

- [ ] I can state spin values and explain why spin is not literal rotation.

**Exercises**

1. What values can S_z take for an electron?
2. How many values can S_z take for a spin-1 particle?
3. Suppose the electron were a ball of radius 2.8 × 10⁻¹⁵ m carrying angular momentum ħ/2. How fast would its equator move? Compare with c.

### 15.10 The Schrödinger equation

**Checks**

- [ ] I can write the equation and check simple solutions.

**Exercises**

1. Check that e^(i(kx − ωt)) solves the free equation if ω = ħk²/(2m).
2. Why does linearity guarantee superposition works?
3. The heat equation (5.9) looks similar but has no i. What does the i change?

### 15.11 Stationary states

**Checks**

- [ ] I can separate time and show |ψ|² is constant for energy eigenstates.

**Exercises**

1. Put ψ = φ(x) e^(−iEt/ħ) into the Schrödinger equation. What equation does φ satisfy?
2. Show |ψ|² does not change in time.
3. Why are these called stationary states?

### 15.11b Superpositions in time

**Checks**

- [ ] I can show a superposition of energies sloshes back and forth.

**Exercises**

1. Show that |ψ|² for (φ₁e^(−iE₁t/ħ) + φ₂e^(−iE₂t/ħ))/√2 oscillates at frequency (E₂ − E₁)/h.
2. For an electron in a 1 nm box, find that frequency for levels 1 and 2.
3. What frequency of light would the electron emit dropping from 2 to 1? Compare.

### 15.12 The particle in a box

**Checks**

- [ ] I can derive the energies and draw the wavefunctions.

**Exercises**

1. Derive Eₙ = n²π²ħ²/(2mL²) using 5.8.
2. For an electron in a 1 nm box, list E₁, E₂ and E₃.
3. Find the photon wavelength for the 2 → 1 jump.
4. In the ground state, what is the chance of finding the particle in the middle third?
5. What happens to the probability density at very large n? Why does this match classical physics?

### 15.13 The finite square well

**Checks**

- [ ] I can explain bound states and wavefunction leakage.

**Exercises**

1. Why does a 1D finite well always have at least one bound state?
2. An electron is 1 eV below the rim. Find the decay length 1/κ of its wavefunction outside, with κ = √(2m(V − E))/ħ.
3. Why are the energies lower than in an infinite well of the same width?

### 15.14 Quantum tunneling

**Checks**

- [ ] I can estimate tunneling probabilities with T ≈ e^(−2κa).

**Exercises**

1. An electron faces a barrier 1 eV above its energy and 1 nm wide. Estimate T.
2. Double the width. What happens to T?
3. Explain in one sentence why you will never tunnel through a wall.
4. In a scanning tunneling microscope the barrier is about 4 eV. By what factor does the current change when the tip moves 0.1 nm?

### 15.15 Reflection from a step

**Checks**

- [ ] I can compute quantum reflection at a step.

**Exercises**

1. A particle with E = 2V₀ meets a step of height V₀. Find R = ((k₁ − k₂)/(k₁ + k₂))².
2. What would classical physics predict?
3. Does a particle also reflect when stepping down? Check with the formula.

### 15.16 The quantum harmonic oscillator

**Checks**

- [ ] I can use Eₙ = ħω(n + ½).

**Exercises**

1. How far apart are neighbouring levels?
2. CO vibrates at 2143 cm⁻¹ (1 cm⁻¹ = 1.24 × 10⁻⁴ eV). Find ħω in eV.
3. Why are oscillator levels evenly spaced while box levels grow as n²?

### 15.17 Zero-point energy

**Checks**

- [ ] I can explain why the ground state is never at rest.

**Exercises**

1. Find CO's zero-point energy.
2. Use the uncertainty principle to explain why E₀ cannot be 0.
3. Which two strange effects in this roadmap come from zero-point energy? (See 10.4 and 23.1.)

### 15.18 Wave packets spread

**Checks**

- [ ] I can estimate how fast a free particle's wave packet spreads.

**Exercises**

1. A Gaussian spreads as σ(t) = σ₀√(1 + (ħt/(2mσ₀²))²). How long until an electron localized to 0.1 nm doubles in width?
2. Do the same for a 1 g marble localized to 1 μm.
3. Which property of waves (9.27) causes the spreading?

### 15.19 Expectation values

**Checks**

- [ ] I can compute ⟨x⟩, ⟨x²⟩ and Δx.

**Exercises**

1. Find ⟨x⟩ for the box ground state.
2. Why is ⟨p⟩ = 0 for any real wavefunction?
3. Find Δx for the box ground state, given ⟨x²⟩ = L²(1/3 − 1/(2π²)).

### 15.20 Probability current

**Checks**

- [ ] I can compute how probability flows.

**Exercises**

1. Find the current J = (ħ/m) Im(ψ* dψ/dx) for ψ = A e^(ikx).
2. Show any real wavefunction has zero current.
3. Write the continuity equation for probability (compare 4.17).

### 15.21 The delta-function well

**Checks**

- [ ] I can solve the simplest bound state.

**Exercises**

1. For V = −αδ(x), show the bound state is ψ = √κ e^(−κ|x|) and find κ from the jump in slope.
2. Find the bound-state energy.

### 15.22 Quantum mechanics in 3D

**Checks**

- [ ] I can find energies and degeneracies in a cubic box.

**Exercises**

1. In a cube, E ∝ nₓ² + n_y² + n_z². List the first five values and their degeneracies.
2. Why does the cube's symmetry cause degeneracy?
3. The 3D oscillator level n has (n + 1)(n + 2)/2 states. Check it for n = 0, 1, 2.

### 15.23 The Mach-Zehnder interferometer

**Checks**

- [ ] I can track single photons through an interferometer.

**Exercises**

1. In a balanced interferometer every photon leaves one port. Why?
2. Block one arm. What fraction reach each detector now?
3. Why does blocking a path you didn't take change where you go? (See 19.20.)

### 15.24 Entanglement

**Checks**

- [ ] I can describe entangled measurement results and why they don't send messages.

**Exercises**

1. For (↑↓ − ↓↑)/√2, you measure the first spin up. What is the second?
2. Show this state is not a product state (3.27).
3. Why can't Alice use entanglement to send Bob a message?

### 15.25 The EPR paradox

**Checks**

- [ ] I can state the EPR argument.

**Exercises**

1. Summarize EPR's argument in three sentences.
2. What did they mean by an "element of reality"?

### 15.26 Bell's theorem

**Checks**

- [ ] I can show quantum correlations break a Bell-type inequality.

**Exercises**

1. Entangled photons disagree with probability sin²(angle difference). Polarizers sit at 0°, 22.5° and 45°. Local hidden variables require P(0, 45) ≤ P(0, 22.5) + P(22.5, 45). Check whether quantum mechanics obeys it.
2. What does the violation rule out?

### 15.27 Schrödinger's cat

**Checks**

- [ ] I can explain what the cat was meant to show.

**Exercises**

1. Was Schrödinger promoting the idea of a dead-and-alive cat?
2. Why do we never see cats in superposition? (See 15.30.)

### 15.28 The quantum eraser

**Checks**

- [ ] I can explain why erasing which-path information brings fringes back only in sorted data.

**Exercises**

1. Mark the two slits with different polarizations. What happens to the fringes, and why?
2. Why can't the eraser send messages into the past?

### 15.29 Wheeler's delayed choice

**Checks**

- [ ] I can explain the experiment without retrocausality.

**Exercises**

1. Describe the experiment in your own words.
2. Does the photon "decide" its past? Explain.

### 15.30 Decoherence

**Checks**

- [ ] I can explain why the everyday world looks classical.

**Exercises**

1. Why does a dust grain in air lose quantum coherence almost instantly?
2. Does decoherence fully solve the measurement problem? (See 19.1.)

### 15.31 The Copenhagen interpretation

**Checks**

- [ ] I can state Copenhagen's main ideas and a criticism.

**Exercises**

1. List its main claims.
2. Where is the "cut" between quantum and classical, and why is that a problem?

### 15.32 Feynman's arrows

**Checks**

- [ ] I can add amplitude arrows to predict where light goes.

**Exercises**

1. Feynman explains 4% reflection from glass with arrows from the front and back surfaces. Why does the reflection vary with glass thickness?
2. Why does light seem to travel in straight lines if it takes every path?
3. Explain a diffraction grating by removing the paths whose arrows point the wrong way.

### 15.33 The path integral

**Checks**

- [ ] I can explain how the classical path emerges from summing all paths.

**Exercises**

1. Each path contributes e^(iS/ħ). Why do paths near the stationary-action path (8.34) add up and others cancel?
2. A baseball has action of order 100 J·s. How many ħ is that, and why does only one path matter?

### 15.34 Building intuition

**Checks**

- [ ] I can explain the core ideas to a friend.

**Exercises**

1. Explain to someone with no physics why two paths can cancel.
2. Explain why measuring changes the outcome, without using the word "disturb".

### 15.35 Deep conceptual episodes

**Checks**

- [ ] I can summarize a long conceptual video in my own words.

**Exercises**

1. Watch three PBS Space Time quantum episodes and write a five-sentence summary of each.

### 15.36 A full university course

**Checks**

- [ ] I can do standard problem-set questions.

**Exercises**

1. Find E₁ for an electron in a 0.5 nm box.
2. Normalize ψ = A sin(πx/L) on [0, L] and find ⟨x⟩.
3. Find the ground-state energy of an oscillator with ħω = 0.1 eV and the photon wavelength for a 1 → 0 jump.

## Answer key

- **15.1:** 1. Random dots, then clear fringes 2. The fringes vanish 3. At the dark fringes, where the paths cancel.
- **15.2:** 1. Double slit; photoelectric effect 2. Electron diffraction; individual hits on a screen.
- **15.3:** 1. Flat 2. Yes; no, it is always real and non-negative.
- **15.4:** 1. 0.36 and 0.64 2. Bright, dark, half.
- **15.4b:** 1. 1/√L 2. √(30/L⁵) 3. 1/√a 4. (πσ²)^(−1/4).
- **15.5:** 1. 1/2 2. 3/4 and 1/4 3. No: a superposition can interfere.
- **15.5b:** 1. 1/2 2. cos²(θ − φ) 3. 1/2.
- **15.6:** 1. Up 2. 50/50 3. 50/50: the x measurement erased the z information.
- **15.7:** 1. About 5.3 × 10⁻²⁵ kg·m/s; about 1 eV, the scale of atomic energies 2. pc ≈ 10 MeV, far more than nuclei offer electrons 3. About 5 × 10⁻²⁰ m/s.
- **15.7b:** 1. About h 2. It is a property of the state, not of clumsy measuring.
- **15.7c:** 1. About 6.6 × 10⁻⁸ eV; about 16 MHz 2. About 2.6 × 10⁻²⁵ s 3. Time is a parameter, not an observable.
- **15.8:** 1. Both are confined waves 2. No 3. The size of the confinement and the mass.
- **15.9:** 1. +ħ/2 or −ħ/2 2. Three 3. About 2 × 10¹⁰ m/s, about 70c: so it is not literally spinning.
- **15.10:** 2. Sums of solutions are solutions 3. Waves oscillate instead of decaying.
- **15.11:** 1. Hφ = Eφ 2. The phase cancels in |ψ|².
- **15.11b:** 2. 1.13 eV/h ≈ 2.7 × 10¹⁴ Hz 3. The same frequency.
- **15.12:** 2. 0.376, 1.50, 3.38 eV 3. About 1,100 nm 4. About 0.61 5. It becomes uniform, like a ball bouncing back and forth.
- **15.13:** 1. Any attractive 1D well holds a state 2. About 0.2 nm 3. The wavefunction spreads into the walls.
- **15.14:** 1. 2κa ≈ 10.2, so T ≈ 4 × 10⁻⁵ 2. It squares: about 10⁻⁹ 3. The mass and width make 2κa astronomically large 4. About 8 times.
- **15.15:** 1. About 3% 2. 0 3. Yes: the formula is symmetric in k₁ and k₂.
- **15.16:** 1. ħω 2. About 0.27 eV 3. Their potentials differ.
- **15.17:** 1. About 0.13 eV 2. Sitting still at the bottom would mean Δx = Δp = 0 3. Liquid helium and the Casimir effect.
- **15.18:** 1. About 3 × 10⁻¹⁶ s 2. About 3 × 10¹⁹ s, far longer than the age of the universe 3. Dispersion.
- **15.19:** 1. L/2 2. ⟨p⟩ = −iħ∫ψψ′ dx is purely imaginary for real ψ but must be real, so it is 0 3. About 0.18L.
- **15.20:** 1. (ħk/m)|A|² 3. ∂|ψ|²/∂t + ∂J/∂x = 0.
- **15.21:** 1. κ = mα/ħ² 2. E = −mα²/(2ħ²).
- **15.22:** 1. 3 (1), 6 (3), 9 (3), 11 (3), 12 (1) 3. 1, 3, 6.
- **15.23:** 1. The two paths cancel at the other port 2. Half are absorbed; a quarter reach each detector 3. Because the photon's amplitude travelled both arms.
- **15.24:** 1. Down 3. Each side alone sees random results.
- **15.25:** 2. A value you can predict with certainty without disturbing the system.
- **15.26:** 1. sin² 45° = 0.5 but sin² 22.5° + sin² 22.5° ≈ 0.29: it fails 2. Local hidden variables.
- **15.27:** 1. No: he meant it as an absurdity 2. Decoherence.
- **15.28:** 1. They vanish: the paths are distinguishable 2. The raw pattern never shows fringes.
- **15.29:** 2. No: only the full set of correlations has meaning.
- **15.30:** 1. Billions of collisions record its position each second 2. No: it explains why we don't see interference, not why one result happens.
- **15.31:** 2. The theory does not say, which is the measurement problem.
- **15.32:** 1. The two arrows rotate relative to each other as thickness changes 2. Arrows away from the straight path cancel.
- **15.33:** 2. About 10³⁶ ħ: phases swing wildly except along the classical path.
- **15.36:** 1. About 1.50 eV 2. A = √(2/L), ⟨x⟩ = L/2 3. 0.05 eV; about 12.4 μm.