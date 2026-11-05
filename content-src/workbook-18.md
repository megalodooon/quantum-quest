# Part 18 workbook: quantum information and computing

Gates: X flips, Z adds a minus sign to ∣1⟩, H turns ∣0⟩ into ∣+⟩. Highlight: in 18.13 you factor 15 with Shor's algorithm by hand.

### 18.1 Qubits

**Checks**

- [ ] I can write a qubit state and predict measurement statistics.

**Exercises**

1. Write a general qubit state and its normalization condition.
2. How many real numbers describe a qubit, once normalization and global phase are removed?
3. You measure (∣0⟩ + ∣1⟩)/√2 a thousand times. About how many 0s?

### 18.1b Classical logic and reversibility

**Checks**

- [ ] I can explain why quantum gates must be reversible.

**Exercises**

1. Write AND's truth table. Why can't you recover the inputs from the output?
2. The Toffoli gate flips a third bit when the first two are 1. Show it computes AND reversibly.
3. Why does irreversible computing cost energy? (See 10.25.)

### 18.2 Quantum gates

**Checks**

- [ ] I can apply X, Z, H and CNOT.

**Exercises**

1. Compute X∣0⟩, Z∣+⟩ and H∣0⟩.
2. Show HZH = X.
3. Apply CNOT (first qubit controls) to ∣10⟩.

### 18.3 Quantum circuits

**Checks**

- [ ] I can read a circuit and predict its output.

**Exercises**

1. Apply H to ∣0⟩ and measure. What do you get?
2. Apply H twice and measure. Why is the answer always 0? What does this have to do with interference?

### 18.4 Making Bell states

**Checks**

- [ ] I can build all four Bell states.

**Exercises**

1. Apply H to the first qubit of ∣00⟩, then CNOT. What state do you get?
2. Do the same starting from ∣01⟩, ∣10⟩ and ∣11⟩.
3. What do measurements of the two qubits always show for the first state?

### 18.5 The no-cloning theorem

**Checks**

- [ ] I can prove no-cloning with linearity.

**Exercises**

1. Suppose U copies ∣0⟩ and ∣1⟩. Show linearity stops it copying ∣+⟩.
2. CNOT "copies" ∣0⟩ and ∣1⟩ onto a blank qubit. What does it do to ∣+⟩∣0⟩?

### 18.6 Quantum teleportation

**Checks**

- [ ] I can follow teleportation step by step.

**Exercises**

1. What resources does teleportation use?
2. Which correction does Bob apply for each of Alice's four results?
3. Why can't this send information faster than light?

### 18.7 Superdense coding

**Checks**

- [ ] I can send two bits with one qubit.

**Exercises**

1. Which four operations does Alice use to encode two bits?
2. Why does this need shared entanglement first?

### 18.8 BB84 key distribution

**Checks**

- [ ] I can explain why eavesdropping shows up.

**Exercises**

1. What fraction of bits survive basis comparison?
2. Eve measures every photon in a random basis and resends. What error rate does she cause in the kept bits?

### 18.9 E91

**Checks**

- [ ] I can explain entanglement-based security.

**Exercises**

1. How does checking a Bell inequality prove nobody listened?
2. What does "device-independent" mean here?

### 18.10 The Deutsch-Jozsa algorithm

**Checks**

- [ ] I can explain the first quantum speedup.

**Exercises**

1. A function on 10 bits is promised to be constant or balanced. How many queries does a classical computer need to be certain in the worst case? The quantum algorithm?

### 18.10b Phase kickback

**Checks**

- [ ] I can show how a control qubit picks up a phase.

**Exercises**

1. Show CNOT(∣+⟩∣−⟩) = ∣−⟩∣−⟩.
2. Why does an oracle acting on a target in ∣−⟩ put (−1)^f(x) on the control?

### 18.10c Bernstein-Vazirani and Simon

**Checks**

- [ ] I can describe two more oracle speedups.

**Exercises**

1. Bernstein-Vazirani finds a hidden n-bit string. How many queries classically and quantumly?
2. Why was Simon's algorithm a stepping stone to Shor's?

### 18.11 Grover's algorithm

**Checks**

- [ ] I can estimate Grover's speedup.

**Exercises**

1. About how many iterations to search 10⁶ items? Compare with classical.
2. For N = 4, how many iterations give certainty?
3. Why is the speedup only quadratic?

### 18.12 The quantum Fourier transform

**Checks**

- [ ] I can apply the QFT to small cases.

**Exercises**

1. What is the QFT on one qubit?
2. What does it do to the uniform superposition?

### 18.13 Shor's algorithm

**Checks**

- [ ] I can follow Shor's algorithm on a small number.

**Exercises**

1. Factor 15 with a = 7: find the period r of 7ˣ mod 15, then compute gcd(7^(r/2) ± 1, 15).
2. Why does finding a period crack factoring?
3. Why does this threaten RSA encryption?

### 18.14 Phase estimation

**Checks**

- [ ] I can explain how eigenvalues are read out.

**Exercises**

1. How many ancilla qubits do you need for 10 bits of precision?
2. Which algorithm in this part uses phase estimation inside?

### 18.15 The variational quantum eigensolver

**Checks**

- [ ] I can explain hybrid quantum-classical algorithms.

**Exercises**

1. Which part runs on the quantum chip and which on a normal computer?
2. Which principle from 16.36 guarantees the answer is an upper bound?

### 18.16 Quantum simulation

**Checks**

- [ ] I can explain Feynman's motivation.

**Exercises**

1. Why did Feynman argue nature should be simulated with quantum computers?
2. Name two things scientists most want to simulate.

### 18.17 Quantum error correction

**Checks**

- [ ] I can detect and fix a bit flip without measuring the data.

**Exercises**

1. Encode ∣0⟩ → ∣000⟩ and ∣1⟩ → ∣111⟩. Which parities do you check?
2. The second qubit flips. What do the two parity checks show?
3. Why does a full code also need to fix phase flips?

### 18.18 The surface code

**Checks**

- [ ] I can estimate surface-code overheads.

**Exercises**

1. A distance-d surface code uses about 2d² physical qubits. How many for d = 5?
2. How does the logical error rate change as d grows?

### 18.19 The threshold theorem

**Checks**

- [ ] I can explain the threshold.

**Exercises**

1. Roughly what physical error rate must the surface code beat?
2. What happens if you add qubits above the threshold?

### 18.20 Qubit hardware

**Checks**

- [ ] I can compare platforms.

**Exercises**

1. Give one strength and one weakness each for superconducting, trapped-ion, photonic and neutral-atom qubits.

### 18.21 Quantum advantage

**Checks**

- [ ] I can describe what has been shown.

**Exercises**

1. What task did Google's 2019 experiment perform?
2. Why did classical computing groups push back?
3. What did later experiments show about error correction below threshold?

### 18.22 Topological quantum computing

**Checks**

- [ ] I can explain the idea of protection by topology.

**Exercises**

1. Why would braiding anyons give built-in protection?
2. Why is the field's status still debated?

### 18.23 Measurement-based computing

**Checks**

- [ ] I can explain computing by measuring.

**Exercises**

1. What resource state is used?
2. Why does the order of measurements matter?

### 18.24 Adiabatic computing and annealing

**Checks**

- [ ] I can link annealing to the adiabatic theorem.

**Exercises**

1. How is the answer encoded? (See 16.41.)
2. What limits the speed?

### 18.25 Von Neumann entropy

**Checks**

- [ ] I can compute S = −tr(ρ log₂ ρ).

**Exercises**

1. Find S for ½I and for a pure state.
2. Find the entropy of one half of a Bell pair.

### 18.26 Noise channels

**Checks**

- [ ] I can describe common noise models on the Bloch sphere.

**Exercises**

1. Write the bit-flip channel with probability p.
2. What does depolarizing noise do to the Bloch vector?
3. Which channel describes T₁ decay?

### 18.27 The Holevo bound

**Checks**

- [ ] I can state how much classical information qubits carry.

**Exercises**

1. What is the most classical information n qubits can deliver?
2. Why doesn't superdense coding break this?

### 18.28 Loophole-free Bell tests

**Checks**

- [ ] I can name the loopholes and how they were closed.

**Exercises**

1. Name three loopholes.
2. Which year saw the first experiments closing the main loopholes together?

### 18.29 The CHSH inequality

**Checks**

- [ ] I can compute the quantum CHSH value.

**Exercises**

1. With correlation E = −cos(θₐ − θ_b), use angles a = 0°, a′ = 90°, b = 45°, b′ = 135°. Compute S = E(a, b) − E(a, b′) + E(a′, b) + E(a′, b′).
2. Compare with the classical limit 2.

### 18.30 Entanglement swapping

**Checks**

- [ ] I can explain how particles that never met become entangled.

**Exercises**

1. Describe the setup with two Bell pairs.
2. Why is this the key to quantum repeaters?

### 18.31 The quantum internet

**Checks**

- [ ] I can explain why quantum signals can't simply be amplified.

**Exercises**

1. Why can't you boost a qubit signal like an internet signal?
2. What did the Micius satellite demonstrate?

### 18.32 Quantum random numbers

**Checks**

- [ ] I can explain true randomness from measurement.

**Exercises**

1. How can a beam splitter generate random bits?
2. How does this differ from a computer's random function?

### 18.33 Quantum complexity

**Checks**

- [ ] I can place BQP among complexity classes.

**Exercises**

1. Is factoring in BQP? Is it believed to be in P?
2. Are quantum computers expected to solve NP-complete problems quickly?

### 18.34 The ZX-calculus

**Checks**

- [ ] I can read simple ZX diagrams.

**Exercises**

1. What are spiders?
2. Show two Hadamards in a row simplify to a plain wire.

### 18.35 Your first real circuit

**Checks**

- [ ] I can build and run a circuit in code.

**Exercises**

1. Build the Bell circuit in Qiskit and simulate 1000 shots. What counts do you see?
2. Run it on real hardware. Why do some 01 and 10 results appear?

## Answer key

- **18.1:** 1. a∣0⟩ + b∣1⟩ with |a|² + |b|² = 1 2. Two 3. About 500.
- **18.1b:** 1. Three inputs give 0, so 0 hides which 2. With the target at 0, it becomes a AND b, and the inputs survive.
- **18.2:** 1. ∣1⟩, ∣−⟩, ∣+⟩ 3. ∣11⟩.
- **18.3:** 1. 0 or 1, 50/50 2. The two paths to ∣1⟩ cancel.
- **18.4:** 1. (∣00⟩ + ∣11⟩)/√2 2. (∣01⟩ + ∣10⟩)/√2, (∣00⟩ − ∣11⟩)/√2, (∣01⟩ − ∣10⟩)/√2 3. The same result.
- **18.5:** 1. U applied to the sum gives (∣00⟩ + ∣11⟩)/√2, not ∣+⟩∣+⟩ 2. An entangled Bell state.
- **18.6:** 1. One Bell pair and two classical bits 2. 00: nothing; 01: X; 10: Z; 11: ZX 3. Bob needs Alice's bits.
- **18.7:** 1. I, X, Z and ZX 2. The Bell pair carries the extra capacity.
- **18.8:** 1. About half 2. 25%.
- **18.9:** 1. Eavesdropping lowers the violation 2. Security holds even with untrusted equipment.
- **18.10:** 1. 2⁹ + 1 = 513; 1.
- **18.10b:** 2. The target is an eigenstate, so the phase lands on the control.
- **18.10c:** 1. n and 1 2. It found periods with exponential speedup.
- **18.11:** 1. About 785 against about 500,000 on average 2. One 3. It is proven optimal for unstructured search.
- **18.12:** 1. H 2. Sends it to ∣0⟩.
- **18.13:** 1. 7, 4, 13, 1: r = 4; gcd(48, 15) = 3 and gcd(50, 15) = 5 2. The period gives a square root of 1 that factors N 3. RSA's security rests on factoring being hard.
- **18.14:** 1. About 10 2. Shor's algorithm.
- **18.15:** 1. Energy measurement on the chip; parameter updates classically 2. The variational principle.
- **18.16:** 1. Classical simulation costs grow exponentially 2. Molecules for chemistry and materials such as superconductors.
- **18.17:** 1. Qubits 1 and 2, and 2 and 3 2. Both checks fail, pointing to qubit 2 3. Quantum errors include phase errors.
- **18.18:** 1. About 50 2. It falls exponentially if below threshold.
- **18.19:** 1. About 1% 2. Errors grow.
- **18.20:** 1. Superconducting: fast gates, needs millikelvin; ions: long coherence, slow gates; photons: room temperature, hard to make interact; neutral atoms: large arrays, slower cycles.
- **18.21:** 1. Sampling outputs of random circuits 2. Better classical algorithms cut the gap 3. Larger codes gave lower logical error.
- **18.22:** 1. Information is stored in global braids, not local states 2. Clean evidence for the needed quasiparticles is disputed.
- **18.23:** 1. A cluster state 2. Later measurement angles depend on earlier results.
- **18.24:** 1. In the ground state of a final Hamiltonian 2. The minimum energy gap.
- **18.25:** 1. 1 bit; 0 2. 1 bit.
- **18.26:** 1. ρ → (1 − p)ρ + pXρX 2. Shrinks it toward the centre 3. Amplitude damping.
- **18.27:** 1. n bits 2. It uses a pre-shared entangled qubit.
- **18.28:** 1. Locality, detection, freedom of choice 2. 2015.
- **18.29:** 1. |S| = 2√2 ≈ 2.83 2. It exceeds 2.
- **18.30:** 2. It extends entanglement over long distances.
- **18.31:** 1. No-cloning 2. Entanglement distributed over about 1200 km.
- **18.32:** 1. Each photon goes randomly one of two ways 2. Pseudo-random numbers come from a formula.
- **18.33:** 1. Yes; it is not known to be in P and believed not to be 2. No.
- **18.34:** 1. Nodes representing Z- or X-type maps 2. H² = I.
- **18.35:** 1. About 500 of 00 and 500 of 11 2. Gate and readout errors.