# Part 24 workbook: biology and quantum biology

The last part starts from what a cell is and ends with the open quantum-biology questions. Biology runs at body temperature, about 310 K, so k_BT ≈ 0.027 eV, and you'll keep comparing quantum energies against it. Useful tools: E (eV) = 1240/λ (nm), and F = 96,485 C/mol.

### 24.1 The cell

**Checks**

- [ ] I can name the main organelles and give typical sizes.

**Exercises**

1. How many 10 μm cells fit side by side across 1 mm?
2. An E. coli cell holds about 1 μm³ (10⁻¹⁵ L). What concentration is one molecule inside it, in nanomolar?
3. Match each to its job: mitochondrion, ribosome, nucleus, membrane.

### 24.2 Proteins and folding

**Checks**

- [ ] I can explain the Levinthal paradox.

**Exercises**

1. How many standard amino acids are there?
2. A 100-residue chain has 3 shapes per residue. How many conformations is that? At 10¹³ tries per second, how long would a random search take?
3. Real proteins fold in milliseconds. What resolves the paradox?
4. What did AlphaFold achieve?

### 24.3 Enzymes

**Checks**

- [ ] I can use the Arrhenius factor.

**Exercises**

1. An enzyme lowers the activation energy by 20 kJ/mol at 310 K. By what factor does the rate rise? Use e^(ΔEₐ/RT).
2. With Eₐ = 50 kJ/mol, by what factor does the rate rise from 300 K to 310 K?
3. How does tunneling (24.14) add a way around the barrier?

### 24.4 DNA

**Checks**

- [ ] I can do DNA arithmetic.

**Exercises**

1. Write the strand that pairs with ATGCGT.
2. How many hydrogen bonds do A-T and G-C pairs have?
3. The human genome has about 3.1 × 10⁹ base pairs at 0.34 nm each. How long is one copy stretched out?
4. At 2 bits per base, how many megabytes is one copy?

### 24.5 Mutations

**Checks**

- [ ] I can classify mutations.

**Exercises**

1. How many codons exist? Why can some mutations be silent?
2. A diploid genome has about 6.2 × 10⁹ bp, and the error rate after proofreading is about 10⁻¹⁰ per bp. How many errors occur per division?
3. Name three kinds of point mutation.

### 24.6 Photosynthesis

**Checks**

- [ ] I can compute photosynthetic efficiency.

**Exercises**

1. Why are leaves green?
2. Find the energy of a 680 nm photon in eV and in kJ per mole of photons.
3. Making one glucose (2870 kJ/mol) takes about 48 photons. What is the maximum efficiency at 680 nm?

### 24.7 The electron transport chain

**Checks**

- [ ] I can compute the free energy of electron transport.

**Exercises**

1. Electrons drop 1.14 V from NADH to O₂. Use ΔG = −nFΔE with n = 2.
2. Electron tunneling slows about tenfold for every 1.7 Å of extra distance. How much slower is a hop 10 Å longer?
3. Which rotary motor makes ATP?

### 24.7b ATP

**Checks**

- [ ] I can estimate ATP turnover.

**Exercises**

1. ATP releases about 50 kJ/mol in the cell. Convert to eV per molecule and compare with k_BT.
2. You burn 2000 kcal (8368 kJ) a day. If it all passes through ATP, how many moles is that? How many kilograms (507 g/mol)?
3. Why does the cell recycle ATP instead of storing it?

### 24.8 Neurons

**Checks**

- [ ] I can use the Nernst equation.

**Exercises**

1. E = (RT/zF)ln(c_out/c_in). At 310 K, compute E for K⁺ (5 mM outside, 140 mM inside).
2. Compute E for Na⁺ (145 mM outside, 12 mM inside).
3. A signal travels 1.8 m at 60 m/s. How long does it take?

### 24.9 How the eye detects light

**Checks**

- [ ] I can describe rhodopsin's photoreaction.

**Exercises**

1. What happens to retinal when it absorbs light, and how fast?
2. Find the photon energy at rhodopsin's 500 nm peak.
3. Why does such a fast reaction need a quantum description?

### 24.9b UV and DNA damage

**Checks**

- [ ] I can compare photon energies with bond energies.

**Exercises**

1. Compute the photon energy at 254, 300 and 550 nm.
2. A C–C bond is about 3.6 eV. Which photons can break it?
3. Why can't a bright red lamp give you sunburn? (See 14.x.)
4. What lesion does UV cause in DNA?

### 24.10 How birds navigate

**Checks**

- [ ] I can explain why the compass is a puzzle.

**Exercises**

1. Compute μ_BB for Earth's 50 μT and compare it with k_BT at 310 K.
2. What does that ratio say about any equilibrium explanation?
3. Weak radio noise disrupted robins in a 2014 study. Why does that point to spin physics?

### 24.11 The quantum-biology overview

**Checks**

- [ ] I can sort claims by strength of evidence.

**Exercises**

1. List every claimed quantum effect in the talk. Rate each as established, likely, or speculative.

### 24.12 Coherence in photosynthesis

**Checks**

- [ ] I can describe the FMO debate.

**Exercises**

1. A random walk spreads as √t and a quantum walk as t. After 100 steps, roughly how far does each get?
2. What did the 2007 experiment claim, and what did later work conclude?

### 24.13 The radical-pair compass

**Checks**

- [ ] I can link the compass to entangled spins.

**Exercises**

1. Write the singlet state of two electrons. Which Bell state is it? (See 18.4.)
2. Electrons precess at 28 GHz/T. Find the frequency and period in a 50 μT field.
3. How long must the pair stay coherent?
4. Which protein is the leading candidate?

### 24.14 Proton tunneling in enzymes

**Checks**

- [ ] I can estimate isotope effects.

**Exercises**

1. A proton tunnels with probability 10⁻⁶. The exponent scales as √m. Estimate the deuteron's probability and the ratio.
2. Why do electrons tunnel so much more easily than protons?
3. Classical isotope effects stay below about 7. What does a measured 80 suggest?

### 24.15 Tunneling and DNA mutations

**Checks**

- [ ] I can state Löwdin's idea.

**Exercises**

1. How could double proton transfer in a G-C pair cause a mutation?
2. Suppose 10⁻⁹ of pairs sit in a tautomeric form at replication. How many is that per 6.2 × 10⁹ bp genome?
3. What did 2022 simulations suggest about these tautomers?

### 24.16 The vibration theory of smell

**Checks**

- [ ] I can compute vibrational energies.

**Exercises**

1. A C–H stretch is about 2900 cm⁻¹. Convert to eV (1 cm⁻¹ = 1.24 × 10⁻⁴ eV).
2. Deuterium roughly doubles the reduced mass. Estimate the C–D frequency.
3. What did fruit-fly and human experiments find?

### 24.17 Seeing single photons

**Checks**

- [ ] I can apply Poisson statistics to vision.

**Exercises**

1. A flash delivers a mean of 1 absorbed photon. Find P(0) and P(at least 1).
2. Repeat for a mean of 6.
3. What did the 2016 single-photon study find?

### 24.18 Is the brain quantum?

**Checks**

- [ ] I can argue the decoherence case.

**Exercises**

1. Compute the thermal de Broglie wavelength h/√(2πmk_BT) for a water molecule at 310 K.
2. Compare it with the 0.3 nm spacing between molecules. What does that mean?
3. Recall Tegmark's numbers from 19.30.

### 24.19 Posner molecules

**Checks**

- [ ] I can state Fisher's proposal.

**Exercises**

1. A Posner molecule is Ca₉(PO₄)₆. How many phosphorus-31 spins does it hold?
2. Why would nuclear spins keep coherence far longer than electron spins?
3. What lithium-isotope result inspired the idea?

### 24.20 MRI

**Checks**

- [ ] I can compute MRI frequencies and polarization.

**Exercises**

1. Find the proton frequency at 3 T, using 42.58 MHz/T.
2. The excess spin fraction is about hf/(2k_BT). Compute it at 3 T and 310 K.
3. How many net aligned protons does 1 mL of water hold?

### 24.21 PET scans

**Checks**

- [ ] I can apply half-life and annihilation physics.

**Exercises**

1. F-18 has a half-life of 110 minutes. What fraction remains after 4 hours?
2. What does annihilation emit? (See 20.18b.)
3. A time-of-flight scanner resolves 300 ps. What position resolution along the line is that?

### 24.22 Green fluorescent protein

**Checks**

- [ ] I can compute Stokes shifts.

**Exercises**

1. GFP absorbs at 395 nm and 475 nm and emits at 509 nm. How much energy is lost in each case?
2. Why is emitted light always lower in energy?
3. Who shared the 2008 Nobel Prize for GFP?

## Answer key

- **24.1:** 1. 100 2. About 1.7 nM 3. Energy; protein synthesis; DNA storage; boundary.
- **24.2:** 1. 20 2. About 5 × 10⁴⁷; about 10²⁷ years 3. A funnel-shaped energy landscape 4. Accurate structure prediction; the 2024 Nobel Prize.
- **24.3:** 1. About 2300 2. About 1.9 3. Particles pass through the barrier.
- **24.4:** 1. TACGCA 2. 2 and 3 3. About 1 m 4. About 775 MB.
- **24.5:** 1. 64; many codons code for the same amino acid 2. About 0.6 3. Substitution, insertion, deletion.
- **24.6:** 1. Chlorophyll absorbs red and blue and reflects green 2. 1.82 eV; about 176 kJ/mol 3. About 34%.
- **24.7:** 1. About −220 kJ/mol 2. About a million times 3. ATP synthase.
- **24.7b:** 1. About 0.52 eV, about 20 k_BT 2. About 167 mol, about 85 kg, roughly your body weight 3. It is unstable and heavy to store.
- **24.8:** 1. About −89 mV 2. About +67 mV 3. 30 ms.
- **24.9:** 1. It switches from 11-cis to all-trans in about 200 fs 2. About 2.48 eV 3. It passes through a conical intersection.
- **24.9b:** 1. 4.88, 4.13, 2.25 eV 2. The 254 and 300 nm photons 3. Each red photon carries too little energy 4. Thymine dimers.
- **24.10:** 1. About 4.6 × 10⁻²⁸ J against 4.3 × 10⁻²¹ J, a ratio of about 10⁻⁷ 2. A non-equilibrium mechanism is needed 3. Megahertz noise matches spin precession frequencies.
- **24.12:** 1. About 10 against about 100 2. Long-lived coherence; later work found mostly vibrational or short-lived coherence.
- **24.13:** 1. (∣↑↓⟩ − ∣↓↑⟩)/√2, Ψ⁻ 2. About 1.4 MHz; about 0.7 μs 3. About a microsecond or longer 4. Cryptochrome 4.
- **24.14:** 1. About 3 × 10⁻⁹; about 300 2. Their mass is 1836 times smaller 3. Tunneling.
- **24.15:** 1. The bases mispair at replication 2. About 6 3. They form but usually revert quickly.
- **24.16:** 1. About 0.36 eV 2. About 2100 cm⁻¹ 3. Flies distinguish them; human results are mixed.
- **24.17:** 1. 0.37 and 0.63 2. 0.0025 and 0.9975 3. Slightly better than chance (about 52%).
- **24.18:** 1. About 0.023 nm 2. Much smaller, so molecules behave classically 3. 10⁻¹³ s or less, against 10⁻³ s.
- **24.19:** 1. 6 2. Weak magnetic moments couple weakly to noise 3. Rats responded differently to lithium-6 and lithium-7.
- **24.20:** 1. About 128 MHz 2. About 10⁻⁵ 3. About 6.7 × 10¹⁷.
- **24.21:** 1. About 22% 2. Two 511 keV photons back to back 3. About 4.5 cm.
- **24.22:** 1. About 0.70 eV and 0.18 eV 2. Vibrational relaxation 3. Shimomura, Chalfie and Tsien.