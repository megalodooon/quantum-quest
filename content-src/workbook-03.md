# Part 3 workbook: linear algebra

You finish this part by proving that an entangled state cannot be split into two separate particles, using nothing but vectors.

### 3.1 Essence of linear algebra

**Checks**

- [ ] I have watched the whole series.
- [ ] I can explain a matrix as a description of where the basis vectors land.

**Exercises**

1. Write one sentence summarizing each chapter, from memory.
2. For [[2, 1], [1, 2]] (rows in order), draw where (1, 0) and (0, 1) land and sketch the transformed grid.
3. Without computing, which of these squashes the plane onto a line: [[1, 2], [2, 4]] or [[1, 2], [3, 4]]?

### 3.2 Vectors

**Checks**

- [ ] I can treat a vector both as an arrow and as a list of numbers.

**Exercises**

1. Draw (2, 1), (−1, 3) and their sum.
2. Compute 3 × (1, −2, 4).
3. A velocity is (3, 4) m/s. What is the speed?
4. A gas state (temperature, pressure, volume) is a list of numbers. Is it still useful to call it a vector? What does adding two such states mean, if anything?

### 3.3 Linear combinations, span and basis

**Checks**

- [ ] I can write a vector in a given basis.
- [ ] I can tell whether a set of vectors spans a space.

**Exercises**

1. Write (5, 7) as a(1, 1) + b(1, −1).
2. Do (1, 2) and (2, 4) span the plane?
3. Is {(1, 0, 0), (1, 1, 0), (1, 1, 1)} a basis of 3D space?
4. Write (2, 3, 4) in that basis.

### 3.3b Gaussian elimination

**Checks**

- [ ] I can solve a 3 × 3 system by row reduction.
- [ ] I can recognize systems with no solution or infinitely many.

**Exercises**

1. Solve x + y + z = 6, 2y + 5z = −4, 2x + 5y − z = 27.
2. Describe all solutions of x + y = 2 and 2x + 2y = 4.
3. Balance C₃H₈ + O₂ → CO₂ + H₂O by writing one equation per element and row-reducing.

### 3.3c Linear independence

**Checks**

- [ ] I can test whether vectors, or functions, are linearly independent.

**Exercises**

1. Are (1, 2, 3), (4, 5, 6) and (7, 8, 9) independent?
2. Are the functions 1, x and x² independent?
3. Are sin²x, cos²x and 1 independent?
4. What is the largest number of independent vectors in 3D space?

### 3.4 Linear transformations and matrices

**Checks**

- [ ] I can write the matrix of a rotation, reflection or shear.
- [ ] I can tell whether a map is linear.

**Exercises**

1. Write the matrix that rotates by 90° counterclockwise.
2. Write the matrix that reflects across the x-axis.
3. Where does the shear [[1, 1], [0, 1]] send (0, 1)?
4. Is f(x, y) = (x + 1, y) linear?
5. Write the matrix that rotates by any angle θ.

### 3.5 Matrix multiplication as composition

**Checks**

- [ ] I can multiply matrices and explain why the order matters.

**Exercises**

1. Compute [[1, 2], [3, 4]] × [[0, 1], [1, 0]] and the product in the other order.
2. Square the 90° rotation matrix. What transformation is it?
3. Multiply the rotation matrices for α and β. Read off the angle addition formulas from 1.24.
4. With σx = [[0, 1], [1, 0]] and σz = [[1, 0], [0, −1]], compute σxσz and σzσx. How are they related?

### 3.6 The determinant

**Checks**

- [ ] I can compute 2 × 2 and 3 × 3 determinants and explain them as area or volume scaling.

**Exercises**

1. det [[3, 1], [2, 4]]. What does the number mean for the unit square?
2. What is the determinant of any rotation matrix?
3. det [[1, 2], [2, 4]]. What does this transformation do?
4. Check det(AB) = det(A) det(B) using the matrices of 3.5 Exercise 1.
5. det [[2, 0, 1], [1, 3, 2], [1, 1, 2]]
6. What does a negative determinant mean geometrically?

### 3.7 Inverses, rank and null space

**Checks**

- [ ] I can invert a 2 × 2 matrix and explain when no inverse exists.

**Exercises**

1. Invert [[2, 1], [1, 1]].
2. Use the inverse to solve [[2, 1], [1, 1]] x = (3, 2).
3. Find the rank and null space of [[1, 2], [2, 4]].
4. Explain with a picture why a matrix with determinant 0 cannot be undone.

### 3.8 The dot product

**Checks**

- [ ] I can compute dot products, angles and projections.

**Exercises**

1. (1, 2, 3) · (4, −5, 6)
2. Find the angle between (1, 0) and (1, 1).
3. A force (3, 4) N moves an object by (2, 0) m. How much work is done?
4. Are (1, 2, −1) and (2, −1, 0) perpendicular?

### 3.9 The cross product

**Checks**

- [ ] I can compute a cross product and use it for areas, torque and angular momentum.

**Exercises**

1. (1, 0, 0) × (0, 1, 0)
2. (1, 2, 3) × (4, 5, 6)
3. Find the area of the parallelogram spanned by those two vectors.
4. A 10 N force pushes along y at the end of a 0.5 m wrench lying along x. Find the torque vector.
5. A particle at (1, 0, 0) has momentum (0, 2, 0). Find its angular momentum L = r × p.

### 3.10 Change of basis

**Checks**

- [ ] I can find the coordinates of a vector in a new basis.
- [ ] I can rewrite a matrix in a new basis.

**Exercises**

1. Find the coordinates of (3, 1) in the basis b₁ = (1, 1), b₂ = (−1, 1).
2. Write the change-of-basis matrix and its inverse.
3. Write the 90° rotation in the basis b₁, b₂. Are you surprised?
4. Photon polarization: horizontal is H = (1, 0); the diagonal states are D = (1, 1)/√2 and A = (1, −1)/√2. Write H in terms of D and A. What does this suggest a horizontally polarized photon "is" in the diagonal basis?

### 3.11 Eigenvectors and eigenvalues

**Checks**

- [ ] I can find eigenvalues from det(A − λI) = 0 and the matching eigenvectors.

**Exercises**

1. Find the eigenvalues and eigenvectors of [[2, 0], [0, 3]].
2. Same for [[2, 1], [1, 2]].
3. Show that the 90° rotation has no real eigenvectors. What are its eigenvalues?
4. Find the eigenvalues and eigenvectors of σx = [[0, 1], [1, 0]].
5. How many eigenvector directions does the shear [[1, 1], [0, 1]] have?

### 3.12 Quick eigenvalue trick

**Checks**

- [ ] I can get 2 × 2 eigenvalues from mean ± √(mean² − det).

**Exercises**

1. [[3, 1], [4, 1]]
2. [[8, 4], [2, 6]]
3. σy = [[0, −i], [i, 0]]

### 3.13 Diagonalization

**Checks**

- [ ] I can write A = PDP⁻¹ and use it to compute high powers.

**Exercises**

1. Diagonalize [[2, 1], [1, 2]].
2. Use the result to compute [[2, 1], [1, 2]]¹⁰.
3. The Fibonacci step is (Fₙ₊₁, Fₙ) = [[1, 1], [1, 0]](Fₙ, Fₙ₋₁). Find the eigenvalues and use them to explain why Fₙ₊₁/Fₙ approaches the golden ratio from 1.8.

### 3.14 Abstract vector spaces

**Checks**

- [ ] I can treat functions as vectors and derivatives as linear operators.

**Exercises**

1. Why do polynomials of degree at most 2 form a vector space? Give a basis.
2. Write the matrix of d/dx in the basis {1, x, x²}.
3. Find all eigenfunctions of d/dx.
4. Show that sin(kx) is an eigenfunction of d²/dx². What is its eigenvalue?

### 3.15 Inner products and orthogonality

**Checks**

- [ ] I can use an integral as an inner product of functions.

**Exercises**

1. With ⟨f, g⟩ = integral of f g from 0 to 2π, show that sin x and cos x are orthogonal.
2. Compute ⟨sin x, sin x⟩ and normalize sin x.
3. Show sin x and sin 2x are orthogonal.
4. Check the Cauchy-Schwarz inequality for (1, 2) and (3, 4).

### 3.16 Projections

**Checks**

- [ ] I can project a vector onto a line and build the projection matrix.

**Exercises**

1. Project (2, 3) onto the line along (1, 1).
2. Write the matrix that projects onto (1, 1)/√2 and check P² = P.
3. A quantum state is (0.6, 0.8). The chance of finding it in the state (1, 0) is the squared length of its projection. Compute it.

### 3.17 Gram-Schmidt

**Checks**

- [ ] I can turn any basis into an orthonormal one.

**Exercises**

1. Orthonormalize (1, 1, 0) and (1, 0, 1).
2. Apply Gram-Schmidt to 1, x and x² on [−1, 1] with the integral inner product. Which famous polynomials appear? (See 5.22.)

### 3.18 Complex inner products

**Checks**

- [ ] I can compute complex inner products and explain why one side is conjugated.

**Exercises**

1. With ⟨u, v⟩ = sum of conj(uᵢ) vᵢ, compute ⟨u, v⟩ for u = (1, i) and v = (i, 1).
2. Compute the length of (1, i). What would you get without the conjugate?
3. Normalize (1 + i, 2).
4. Show that ⟨v, u⟩ is the complex conjugate of ⟨u, v⟩.

### 3.19 Hermitian matrices

**Checks**

- [ ] I can prove Hermitian matrices have real eigenvalues.

**Exercises**

1. Is [[2, i], [−i, 3]] Hermitian?
2. Find its eigenvalues. Are they real?
3. Prove that the eigenvalues of any Hermitian matrix are real.
4. Check that σy is Hermitian.

### 3.20 Unitary matrices

**Checks**

- [ ] I can check U†U = I and explain why unitary maps preserve length.

**Exercises**

1. Is the Hadamard matrix H = (1/√2)[[1, 1], [1, −1]] unitary?
2. Apply H to (1, 0). What kind of state do you get?
3. Show that every eigenvalue of a unitary matrix has absolute value 1.
4. Show that rotation matrices are unitary.

### 3.21 The spectral theorem

**Checks**

- [ ] I can write a Hermitian matrix as a sum of eigenvalues times projectors.

**Exercises**

1. Write [[2, 1], [1, 2]] as 3P₁ + 1P₂ with projectors onto its eigenvectors.
2. Do the same for σz.
3. Use the decomposition to find a square root of [[2, 1], [1, 2]].

### 3.22 The trace

**Checks**

- [ ] I know the trace equals the sum of the eigenvalues and is basis-independent.

**Exercises**

1. Find the trace of [[1, 2], [3, 4]] and check it equals the sum of its eigenvalues.
2. Check tr(AB) = tr(BA) with the matrices of 3.5 Exercise 1.
3. What are the traces of the three Pauli matrices?
4. What is the trace of a projection matrix?

### 3.23 Commutators

**Checks**

- [ ] I can compute [A, B] = AB − BA and explain what a non-zero commutator means.

**Exercises**

1. Compute [σx, σz] and write it in terms of σy.
2. Compute [σx, σy].
3. Why do any two diagonal matrices commute?
4. Prove [A, BC] = [A, B]C + B[A, C].

### 3.24 The matrix exponential

**Checks**

- [ ] I can compute e^A for diagonal matrices and via power series.

**Exercises**

1. e^A for A = diag(1, 2)
2. Let J = [[0, −1], [1, 0]]. Show J² = −I, then use the series to show e^(θJ) is the rotation matrix. Compare with Euler's formula.
3. Compute e^(−iθσz/2).
4. Is e^(A + B) = e^A e^B when A and B do not commute? Test it on a computer with two random matrices.

### 3.25 Outer products and projectors

**Checks**

- [ ] I can build a matrix from two vectors and recognize projectors.

**Exercises**

1. Compute the outer product of (1, 0) with itself.
2. Compute the outer product of (1, 1)/√2 with itself. Compare with 3.16.
3. What is the rank of any outer product of two non-zero vectors?
4. Add the outer products of (1, 0) and (0, 1) with themselves. What do you get, and why?

### 3.26 The Pauli matrices

**Checks**

- [ ] I know σx, σy and σz, their squares, products and eigenvalues.

**Exercises**

1. Show σx² = σy² = σz² = I.
2. Show σxσy = iσz.
3. What are the eigenvalues of each Pauli matrix?
4. Write [[3, 1 − i], [1 + i, −1]] as aI + bσx + cσy + dσz.

### 3.27 Tensor products

**Checks**

- [ ] I can compute tensor products of vectors and matrices.
- [ ] I can show that some two-particle states cannot be written as a product.

**Exercises**

1. (1, 0) ⊗ (0, 1)
2. Write (a, b) ⊗ (c, d) in general.
3. Show that (1, 0, 0, 1)/√2 cannot be written as (a, b) ⊗ (c, d). You have just proved this state is entangled.
4. Write σx ⊗ I as a 4 × 4 matrix.
5. What is the dimension of the space for 10 qubits?

### 3.28 Singular value decomposition

**Checks**

- [ ] I can describe any matrix as rotate, stretch, rotate.

**Exercises**

1. Find the singular values of [[1, 1], [0, 0]].
2. In Python, load a greyscale photo as a matrix, keep only its 20 largest singular values, and display the result. How much quality is lost?
3. Arrange (1, 0, 0, 1)/√2 as the 2 × 2 matrix [[1, 0], [0, 1]]/√2 and find its singular values. (Two equal values mean maximal entanglement, as you will see in 16.27.)

### 3.29 A full linear algebra course

**Checks**

- [ ] I can do mixed linear algebra problems quickly and correctly.

**Exercises**

1. Work through the first three problem sets of MIT 18.06.
2. Find the eigenvalues of [[4, 1, 0], [1, 4, 1], [0, 1, 4]].
3. Prove that similar matrices (B = P⁻¹AP) have the same eigenvalues.

## Answer key

- **3.1:** 3. [[1, 2], [2, 4]]; its determinant is 0.
- **3.2:** 1. (1, 4) 2. (3, −6, 12) 3. 5 m/s 4. The numbers form a vector, but adding two whole states has little physical meaning; differences between states do.
- **3.3:** 1. a = 6, b = −1 2. No: they point the same way 3. Yes 4. (−1, −1, 4).
- **3.3b:** 1. x = 5, y = 3, z = −2 2. x = 2 − t, y = t for any t 3. C₃H₈ + 5O₂ → 3CO₂ + 4H₂O.
- **3.3c:** 1. No: (7, 8, 9) = 2(4, 5, 6) − (1, 2, 3) 2. Yes 3. No: sin²x + cos²x − 1 = 0 4. 3.
- **3.4:** 1. [[0, −1], [1, 0]] 2. [[1, 0], [0, −1]] 3. (1, 1) 4. No: it moves the origin 5. [[cos θ, −sin θ], [sin θ, cos θ]].
- **3.5:** 1. [[2, 1], [4, 3]] and [[3, 4], [1, 2]] 2. [[−1, 0], [0, −1]], a 180° rotation 4. σxσz = [[0, −1], [1, 0]] and σzσx = [[0, 1], [−1, 0]]: one is minus the other.
- **3.6:** 1. 10: areas grow 10 times 2. 1 3. 0: the plane is squashed onto a line 4. (−2)(−1) = 2 = det [[2, 1], [4, 3]] 5. 6 6. Orientation is flipped, like a mirror.
- **3.7:** 1. [[1, −1], [−1, 2]] 2. (1, 1) 3. Rank 1; null space along (2, −1) 4. Many inputs land on the same output.
- **3.8:** 1. 12 2. 45° 3. 6 J 4. Yes.
- **3.9:** 1. (0, 0, 1) 2. (−3, 6, −3) 3. √54 ≈ 7.35 4. (0, 0, 5) N·m 5. (0, 0, 2).
- **3.10:** 1. (2, −1) 2. P = [[1, −1], [1, 1]]; P⁻¹ = ½[[1, 1], [−1, 1]] 3. Still [[0, −1], [1, 0]], because b₂ is b₁ rotated 90° 4. H = (D + A)/√2: an equal superposition of diagonal and antidiagonal.
- **3.11:** 1. 2 along (1, 0); 3 along (0, 1) 2. 3 along (1, 1); 1 along (1, −1) 3. λ² + 1 = 0, so λ = ±i 4. +1 along (1, 1); −1 along (1, −1) 5. One: (1, 0).
- **3.12:** 1. 2 ± √5 2. 10 and 4 3. ±1.
- **3.13:** 1. P = [[1, 1], [1, −1]], D = diag(3, 1) 2. [[29525, 29524], [29524, 29525]] 3. Eigenvalues (1 ± √5)/2; the larger dominates after many steps.
- **3.14:** 2. Columns are d/dx of 1, x, x²: [[0, 1, 0], [0, 0, 2], [0, 0, 0]] 3. e^(kx), eigenvalue k 4. −k².
- **3.15:** 2. π; sin x/√π 4. 11 ≤ √5 × 5 ≈ 11.18.
- **3.16:** 1. (2.5, 2.5) 2. ½[[1, 1], [1, 1]] 3. 0.36.
- **3.17:** 1. (1, 1, 0)/√2 and (1, −1, 2)/√6 2. 1, x and x² − 1/3: the Legendre polynomials, up to scale.
- **3.18:** 1. 0 2. √2; without the conjugate you would get 1 + i² = 0 3. (1 + i, 2)/√6.
- **3.19:** 1. Yes 2. 2.5 ± √1.25 ≈ 3.62 and 1.38, both real.
- **3.20:** 1. Yes 2. (1, 1)/√2, an equal superposition.
- **3.21:** 1. P₁ = ½[[1, 1], [1, 1]], P₂ = ½[[1, −1], [−1, 1]] 2. σz = 1 × [[1, 0], [0, 0]] − 1 × [[0, 0], [0, 1]] 3. √3 P₁ + P₂.
- **3.22:** 1. 5 = (5 + √33)/2 + (5 − √33)/2 2. Both traces are 6 3. All 0 4. Its rank.
- **3.23:** 1. [[0, −2], [2, 0]] = −2iσy 2. 2iσz 3. Diagonal entries multiply in either order.
- **3.24:** 1. diag(e, e²) 2. e^(θJ) = cos θ I + sin θ J 3. diag(e^(−iθ/2), e^(iθ/2)) 4. In general no.
- **3.25:** 1. [[1, 0], [0, 0]] 2. ½[[1, 1], [1, 1]] 3. 1 4. The identity, because the basis is complete.
- **3.26:** 3. ±1 for all three 4. a = 1, b = 1, c = 1, d = 2.
- **3.27:** 1. (0, 1, 0, 0) 2. (ac, ad, bc, bd) 3. ad = 0 and bc = 0 force ac = 0 or bd = 0, but both must be 1/√2 4. [[0, 0, 1, 0], [0, 0, 0, 1], [1, 0, 0, 0], [0, 1, 0, 0]] 5. 2¹⁰ = 1024.
- **3.28:** 1. √2 and 0 3. 1/√2 and 1/√2.
- **3.29:** 2. 4 − √2, 4 and 4 + √2 3. det(P⁻¹AP − λI) = det(A − λI).