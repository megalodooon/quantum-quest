# Part 20 workbook: relativistic QM and quantum field theory

You'll need these constants: ħc ≈ 197.3 MeV·fm, m_e c² = 0.511 MeV, α ≈ 1/137 and μ_B ≈ 9.27 × 10⁻²⁴ J/T. Many of the exercises are estimates that come out to real, measured numbers: the range of the nuclear force, the Casimir pressure, the critical field for tearing pairs out of the vacuum.

### 20.1 Why QM and relativity clash

**Checks**

- [ ] I can explain why particle number can't stay fixed.

**Exercises**

1. Compute the electron's Compton wavelength h/(mc).
2. Squeeze an electron into a region smaller than its reduced Compton wavelength ħ/(mc). Use the uncertainty principle to estimate its energy spread. What becomes possible?
3. What is the minimum photon energy that can create an electron-positron pair?

### 20.2 The Klein-Gordon equation

**Checks**

- [ ] I can derive it and state its problems.

**Exercises**

1. Substitute E → iħ∂ₜ and p → −iħ∇ into E² = p²c² + m²c⁴. Write the equation you get.
2. Insert e^(i(kx − ωt)) and find the dispersion relation.
3. Name the two problems that made physicists abandon it as a single-particle equation.

### 20.3 The Dirac equation

**Checks**

- [ ] I can explain why Dirac needed matrices.

**Exercises**

1. Dirac wanted E = cα·p + βmc² to square to E² = p²c² + m²c⁴. Which conditions must αᵢ and β satisfy?
2. Why can't they be ordinary numbers?
3. What is the smallest matrix size that works?

### 20.4 Spinors and gamma matrices

**Checks**

- [ ] I can work with anticommuting matrices.

**Exercises**

1. Compute σₓσ_y and σ_yσₓ for the Pauli matrices. Show they anticommute.
2. State the rule {γ^μ, γ^ν} = 2η^μν in words.
3. What do the four components of a Dirac spinor represent?

### 20.5 The Dirac sea and antimatter

**Checks**

- [ ] I can tell the story of the positron's prediction.

**Exercises**

1. How does a "hole" in a filled sea of negative-energy states behave?
2. Who found the positron, in what year, and how?
3. Why is the sea picture abandoned in modern QFT?

### 20.6 g = 2 from the Dirac equation

**Checks**

- [ ] I can use g to compute spin-flip energies.

**Exercises**

1. With g = 2, what is the electron's spin magnetic moment in units of μ_B?
2. The spin-flip energy is gμ_B B. Compute it for B = 1 T, then convert it to a photon frequency.
3. Which technique in Part 23 uses this frequency?

### 20.7 The Klein paradox

**Checks**

- [ ] I can explain transparent barriers.

**Exercises**

1. About how high must a potential step be before the paradox appears?
2. How does pair creation resolve it?
3. Which material shows an analogous effect? (See 17.29.)

### 20.8 Zitterbewegung

**Checks**

- [ ] I can estimate the trembling motion.

**Exercises**

1. The angular frequency is 2mc²/ħ. Compute it for an electron.
2. The amplitude is about ħ/(2mc). Compute it.
3. How was zitterbewegung simulated in 2010?

### 20.9 Visualizing quantum fields

**Checks**

- [ ] I can describe particles as ripples in fields.

**Exercises**

1. Why are all electrons in the universe exactly identical?
2. What is a photon in the field picture?

### 20.10 Why fields come first

**Checks**

- [ ] I can say why physics needs fields rather than particles.

**Exercises**

1. Give two phenomena a fixed-particle theory can't describe.
2. Where does the Pauli principle (15.x) come from in a field theory?

### 20.11 Expert talk: the field picture

**Checks**

- [ ] I can summarize the talk in three sentences.

**Exercises**

1. Which fields of the Standard Model can you name?
2. What is the biggest open problem the talk mentions?

### 20.12 Classical field theory

**Checks**

- [ ] I can derive field equations from a Lagrangian density.

**Exercises**

1. A string has ℒ = ½μ(∂ₜφ)² − ½T(∂ₓφ)². Derive the wave equation and the wave speed.
2. Do the same for ℒ = ½(∂φ)² − ½m²φ² in natural units. Which equation do you get?

### 20.13 Creation and annihilation operators

**Checks**

- [ ] I can use a and a† on number states.

**Exercises**

1. Compute a†a†∣0⟩.
2. Verify [a, a†] = 1 by acting on ∣n⟩.
3. Fermion operators satisfy (b†)² = 0. What law of nature is that?

### 20.14 Quantizing a free field

**Checks**

- [ ] I can see a field as many oscillators.

**Exercises**

1. What is the frequency of the mode with wavenumber k for a field of mass m?
2. Each mode carries zero-point energy ½ħω. Why does that make the vacuum energy infinite?
3. How does normal ordering deal with this, and why does gravity make the problem real?

### 20.15 Virtual particles

**Checks**

- [ ] I can estimate a force's range from its carrier's mass.

**Exercises**

1. A force carried by a particle of mass m has range R ≈ ħ/(mc) = ħc/(mc²). Compute it for the pion (140 MeV).
2. Compute it for the W boson (80.4 GeV).
3. Why is the electromagnetic force long-range?
4. In what sense are virtual particles not real particles?

### 20.16 The quantum vacuum

**Checks**

- [ ] I can compute the Casimir pressure.

**Exercises**

1. The Casimir pressure is π²ħc/(240d⁴). Compute it for plates 1 μm apart.
2. Compute it at 10 nm and compare with atmospheric pressure.
3. Name another measurable effect of vacuum fluctuations.

### 20.17 Feynman diagrams

**Checks**

- [ ] I can draw diagrams and count powers of α.

**Exercises**

1. Draw the lowest-order diagrams for e⁻e⁻ → e⁻e⁻. Why are there two?
2. Each vertex brings a factor e ∝ √α. How does the amplitude scale for a two-vertex diagram? How does the probability scale?
3. Adding a loop adds two vertices. By what factor does that suppress the amplitude?

### 20.17b The S-matrix and Feynman rules

**Checks**

- [ ] I can turn a cross-section into an event count.

**Exercises**

1. Event rate = luminosity × cross-section. With 10³⁴ cm⁻² s⁻¹ and 50 pb (1 pb = 10⁻³⁶ cm²), find the rate per second and per day.
2. Which formula from Part 16 is the S-matrix's simplest relative?
3. In a Feynman rule, what does an internal line contribute?

### 20.18 Quantum electrodynamics

**Checks**

- [ ] I can compute the fine-structure constant.

**Exercises**

1. Compute α = e²/(4πε₀ħc) from the constants.
2. Why does a small α make QED calculations work so well?

### 20.18b Annihilation and Compton scattering

**Checks**

- [ ] I can apply conservation laws to QED processes.

**Exercises**

1. An electron and a positron annihilate at rest. Why two photons, not one? What energy and direction does each have?
2. Compute the Compton shift for a photon scattered straight back.
3. What is the minimum collision energy for e⁺e⁻ → μ⁺μ⁻? (The muon is 105.7 MeV.)

### 20.19 The electron's g − 2

**Checks**

- [ ] I can compute Schwinger's first correction.

**Exercises**

1. The first correction is a = α/(2π). Compute it.
2. The measured value is a ≈ 0.00115965. How close is the first term?
3. What is the status of the muon g − 2 comparison?

### 20.20 Gauge theory

**Checks**

- [ ] I can explain why local symmetry needs a field.

**Exercises**

1. Under ψ → e^(iθ(x))ψ, what extra term does ∂ψ pick up?
2. How does adding a field A cancel it?

### 20.21 U(1) gives electromagnetism

**Checks**

- [ ] I can derive the photon's properties from symmetry.

**Exercises**

1. How must A transform to restore the symmetry?
2. Show that the field strength F is unchanged.
3. Why does gauge symmetry force the photon to be massless?

### 20.22 Yang-Mills theory

**Checks**

- [ ] I can count gauge bosons.

**Exercises**

1. SU(N) has N² − 1 generators. How many gauge bosons does SU(2) give? SU(3)?
2. Why do gluons interact with each other while photons don't?
3. What is the Millennium Prize problem about Yang-Mills?

### 20.23 Renormalization

**Checks**

- [ ] I can explain bare and measured charges.

**Exercises**

1. How do virtual pairs screen an electron's charge?
2. How does this relate to 1 + 2 + 3 + … = −1/12 (5.31)?
3. Why did Dirac and Feynman both feel uneasy about renormalization, and how did Wilson change the view?

### 20.24 Running couplings

**Checks**

- [ ] I can run the strong coupling with energy.

**Exercises**

1. At one loop, α_s(Q) = α_s(μ)/(1 + bα_s(μ)ln(Q²/μ²)), with b = (33 − 2n_f)/(12π). Start from α_s = 0.118 at 91.2 GeV with n_f = 5 and find α_s at 1 TeV.
2. How many quark flavours would it take to destroy asymptotic freedom?
3. α is about 1/137 at low energy. About what is it at 91 GeV?

### 20.25 Effective field theory

**Checks**

- [ ] I can read a new energy scale from a coupling.

**Exercises**

1. Fermi's constant is G_F ≈ 1.166 × 10⁻⁵ GeV⁻². Compute (√2G_F)^(−½). Which scale is that?
2. Why did Fermi's theory work at low energy but fail at high energy?
3. Give a non-particle example of effective theory.

### 20.26 Spontaneous symmetry breaking

**Checks**

- [ ] I can find the vacuum of a Mexican-hat potential.

**Exercises**

1. For V = −μ²φ² + λφ⁴, find where V is lowest.
2. Give two everyday examples of symmetric laws with an asymmetric state.

### 20.27 Goldstone bosons

**Checks**

- [ ] I can count Goldstone modes.

**Exercises**

1. A complex field breaks U(1). How many Goldstone bosons appear?
2. Why are pions so much lighter than protons?
3. Name a Goldstone mode in a solid or magnet.

### 20.28 The Higgs mechanism

**Checks**

- [ ] I can count degrees of freedom in the Higgs mechanism.

**Exercises**

1. A massless vector boson has 2 polarizations; a massive one has 3. Where does the extra one come from?
2. The Higgs doublet has 4 real fields. How many are eaten, and how many become the Higgs boson?
3. Is most of your mass from the Higgs? Explain.

### 20.29 Quantum chromodynamics

**Checks**

- [ ] I can use colour counting.

**Exercises**

1. The Δ⁺⁺ is uuu with all spins aligned. Why did it demand a new quantum number?
2. The R ratio is R = N_c × the sum of Q² over reachable quarks. Compute R with u, d, s, then with c, then with b, using N_c = 3.
3. How did measuring R confirm three colours?

### 20.30 Asymptotic freedom and confinement

**Checks**

- [ ] I can estimate the force between quarks.

**Exercises**

1. The QCD string tension is about 1 GeV/fm. Convert it to newtons. What mass would weigh that much on Earth?
2. What happens when you pull a quark 2 fm away?
3. What are jets?

### 20.31 The CPT theorem

**Checks**

- [ ] I can apply C, P and T to particles.

**Exercises**

1. Apply P, C and CP to a left-handed neutrino. Which results exist in nature?
2. Which property must particles and antiparticles share by CPT?
3. How is antihydrogen used to test CPT?

### 20.32 The path integral in QFT

**Checks**

- [ ] I can link the path integral to statistical mechanics.

**Exercises**

1. Write Z with e^(iS/ħ). What does the Wick rotation t → −iτ turn it into?
2. Why does that help lattice QCD?

### 20.33 Anomalies

**Checks**

- [ ] I can do an anomaly-cancellation check.

**Exercises**

1. Add the electric charges of one generation: e, ν, and three colours each of u and d.
2. Which decay does the chiral anomaly explain?
3. Why must gauge anomalies cancel?

### 20.34 Instantons

**Checks**

- [ ] I can estimate a tunneling suppression in field theory.

**Exercises**

1. Weak-force instantons are suppressed by e^(−4π/α_w). With α_w ≈ 1/30, write this as a power of 10.
2. What does this mean for proton decay through this route?
3. How does this connect with WKB tunneling (16.x)?

### 20.35 Conformal field theory

**Checks**

- [ ] I can describe scale invariance.

**Exercises**

1. A correlation falls as 1/r^(2Δ). By what factor does it change when every distance is doubled?
2. Where do CFTs appear in the real world?

### 20.36 Lattice QCD

**Checks**

- [ ] I can estimate the size of a lattice simulation.

**Exercises**

1. A lattice with spacing 0.1 fm spans 4 fm in all four directions. How many sites does it have?
2. Each site has 4 links, and each link holds an SU(3) matrix with 8 real parameters. How many numbers is that?
3. Which famous mass has lattice QCD computed?

### 20.37 The Schwinger effect

**Checks**

- [ ] I can compute the critical field.

**Exercises**

1. Compute E_c = m²c³/(eħ).
2. Show it is the field that does work mc² across the reduced Compton wavelength.
3. Why has the effect not been observed directly?

### 20.38 The Unruh effect

**Checks**

- [ ] I can compute Unruh temperatures.

**Exercises**

1. T = ħa/(2πck_B). Compute T for a = 9.8 m/s².
2. Which acceleration gives 1 K?
3. How does this relate to Hawking radiation (22.x)?

### 20.39 Graduate QFT lectures

**Checks**

- [ ] I can follow a graduate-level derivation.

**Exercises**

1. After the first lectures, write in your own words why QFT is the only way to combine QM and relativity with locality.

### 20.40 A gentler lecture series

**Checks**

- [ ] I can write a Lorentz-invariant action.

**Exercises**

1. Why must the action be a Lorentz scalar?
2. Which combination of ∂_tφ and ∇φ is Lorentz invariant?

## Answer key

- **20.1:** 1. About 2.43 pm 2. About mc², enough to create pairs 3. 1.022 MeV.
- **20.2:** 1. (1/c²)∂ₜ²φ − ∇²φ + (mc/ħ)²φ = 0 2. ω² = c²k² + (mc²/ħ)² 3. Negative energies and a density that can go negative.
- **20.3:** 1. αᵢ² = β² = 1, and all pairs anticommute 2. Numbers commute 3. 4 × 4.
- **20.4:** 1. iσ_z and −iσ_z 2. The gammas square to the metric and anticommute 3. Spin up and down, for particle and antiparticle.
- **20.5:** 1. As a positive particle with positive energy 2. Anderson, 1932, with a cloud chamber 3. It fails for bosons; fields replace it.
- **20.6:** 1. About 1 μ_B 2. About 1.85 × 10⁻²³ J, about 28 GHz 3. ESR (23.29b).
- **20.7:** 1. About 2mc² 2. The barrier creates pairs 3. Graphene.
- **20.8:** 1. About 1.55 × 10²¹ rad/s 2. About 0.19 pm 3. With a trapped ion.
- **20.9:** 1. They are excitations of one field 2. A quantum of the electromagnetic field.
- **20.10:** 1. Pair creation and decay 2. Anticommuting field operators.
- **20.11:** 1. Quarks, leptons, gluons, W, Z, photon, Higgs 2. For example, quantum gravity or dark matter.
- **20.12:** 1. μφₜₜ = Tφₓₓ, speed √(T/μ) 2. Klein-Gordon.
- **20.13:** 1. √2∣2⟩ 2. (n + 1) − n = 1 3. Pauli exclusion.
- **20.14:** 1. ω = √(c²k² + (mc²/ħ)²) 2. There are infinitely many modes 3. It drops the constant; gravity feels it, which is the cosmological constant problem.
- **20.15:** 1. About 1.4 fm 2. About 2.5 × 10⁻³ fm 3. The photon is massless 4. They are terms in a calculation and can't be detected.
- **20.16:** 1. About 1.3 × 10⁻³ Pa 2. About 1.3 × 10⁵ Pa, about 1.3 atmospheres 3. The Lamb shift.
- **20.17:** 1. The two electrons are identical, so swapped outgoing particles count separately 2. α; α² 3. About 1/137.
- **20.17b:** 1. 0.5 per second, about 43,000 per day 2. Fermi's golden rule 3. A propagator.
- **20.18:** 1. About 1/137 2. Each extra order is about 100 times smaller.
- **20.18b:** 1. Momentum must stay zero; 511 keV each, back to back 2. 2h/(mc) ≈ 4.85 pm 3. 211.4 MeV.
- **20.19:** 1. About 0.0011614 2. Within about 0.15% 3. The 2025 lattice-based theory agrees with Fermilab's final measurement.
- **20.20:** 1. i(∂θ)ψ 2. The field shifts to absorb the extra term.
- **20.21:** 1. A → A + (ħ/q)∂θ 2. Derivatives of ∂θ cancel 3. A mass term in A² isn't invariant.
- **20.22:** 1. 3; 8 2. Gluons carry colour themselves 3. Prove a mass gap exists.
- **20.23:** 1. Pairs align and shield the charge 2. Infinities are given finite meaning 3. Wilson treated it as physics changing with scale.
- **20.24:** 1. About 0.088 2. 17 3. About 1/128.
- **20.25:** 1. About 246 GeV, the Higgs vacuum value 2. It ignored the W 3. Fluid dynamics.
- **20.26:** 1. φ² = μ²/(2λ) 2. A magnet, or a pencil falling from its tip.
- **20.27:** 1. One 2. They are near-Goldstone bosons 3. Phonons, magnons.
- **20.28:** 1. An eaten Goldstone 2. 3 eaten, 1 Higgs boson 3. No, only about 1%; most mass comes from QCD energy.
- **20.29:** 1. The quarks would otherwise be identical fermions 2. 2, 10/3, 11/3 3. R matched experiment only with 3 colours.
- **20.30:** 1. About 1.6 × 10⁵ N, the weight of about 16 tonnes 2. The string breaks into new hadrons 3. Sprays of hadrons from quarks or gluons.
- **20.31:** 1. Right-handed ν (no), left-handed anti-ν (no), right-handed anti-ν (yes) 2. Mass and lifetime 3. Comparing its spectral lines with hydrogen's.
- **20.32:** 1. Statistical mechanics in one more dimension 2. It makes the weights real and positive.
- **20.33:** 1. 0 2. π⁰ → γγ 3. Otherwise the theory is inconsistent.
- **20.34:** 1. About 10⁻¹⁶⁴ 2. Unobservable 3. Both are tunneling through a barrier.
- **20.35:** 1. 2^(−2Δ) 2. Critical points, string theory.
- **20.36:** 1. 40⁴ ≈ 2.56 million 2. About 82 million 3. The proton's.
- **20.37:** 1. About 1.3 × 10¹⁸ V/m 3. No laser reaches it yet.
- **20.38:** 1. About 4 × 10⁻²⁰ K 2. About 2.5 × 10²⁰ m/s² 3. They are linked by the equivalence principle.
- **20.40:** 1. So all observers agree on the laws 2. (∂_tφ)²/c² − (∇φ)².