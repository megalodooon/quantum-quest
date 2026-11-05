# Part 6 workbook: probability, statistics and information

Quantum mechanics only ever predicts probabilities; here you learn to compute them, spread them and test them, and you estimate how long sunlight takes to escape the Sun.

### 6.1 Probability basics

**Checks**

- [ ] I can add probabilities for "or" and multiply them for independent "and".

**Exercises**

1. What is the chance of rolling a 6? Of not rolling a 6?
2. Roll two dice. What is the chance both show 6? That at least one shows 6?
3. Draw one card. What is the chance it is a heart or a king?
4. Birthday problem: with 23 people in a room, what is the chance two share a birthday? (Compute the chance that all differ first.)
5. A fair coin has landed heads 10 times in a row. What is the chance of heads next?

### 6.2 Conditional probability

**Checks**

- [ ] I can compute P(A given B) and avoid the classic traps.

**Exercises**

1. A family has two children and at least one is a boy. What is the chance both are boys?
2. Draw two cards without replacement. What is the chance both are aces?
3. The first die shows 3. What is the chance the two dice sum to 8?
4. Monty Hall: you pick one of three doors, the host opens an empty one of the other two. Should you switch? Prove it.

### 6.3 Bayes' theorem

**Checks**

- [ ] I can update a probability with new evidence using Bayes' theorem.

**Exercises**

1. 1% of people have a disease. A test catches 90% of cases but gives a false positive to 9% of healthy people. You test positive. What is the chance you are sick?
2. You take the test again and are positive again. Update your answer.
3. Explain in a sentence why a rare condition makes a single positive test weak evidence.

### 6.4 Expected value

**Checks**

- [ ] I can compute expected values and use linearity.

**Exercises**

1. Find the expected roll of one die.
2. A bet wins 10 € with probability 0.1 and loses 1 € otherwise. Is it worth taking?
3. Find the expected value of the square of a die roll.
4. Find the expected sum of two dice without listing outcomes.
5. A spin measurement gives +1 with probability 0.75 and −1 with probability 0.25. What is the average result? (This is a quantum expectation value.)

### 6.5 Variance and standard deviation

**Checks**

- [ ] I can compute variance and standard deviation and know how they scale.

**Exercises**

1. Find the variance and standard deviation of a die roll (use 6.4 Exercise 3).
2. Find the mean and standard deviation of 2, 4, 4, 4, 5, 5, 7, 9.
3. Show Var(aX + b) = a² Var(X).
4. Find the standard deviation of the spin measurement in 6.4 Exercise 5.
5. In the uncertainty principle, Δx is a standard deviation. Of what, exactly? Explain in terms of many repeated experiments.

### 6.6 Probability densities

**Checks**

- [ ] I can find probabilities, means and normalization from a density.

**Exercises**

1. X is uniform on [0, 2]. What is its density, and P(0.5 < X < 1)?
2. Check that p(x) = 3x² on [0, 1] is normalized and find its mean.
3. A particle in a box of length 1 has density 2 sin²(πx). What is the chance of finding it in the left quarter of the box?
4. A nucleus decays at a random time with density λe^(−λt). What is its average lifetime?

### 6.7 The binomial distribution

**Checks**

- [ ] I can compute binomial probabilities, mean and spread.

**Exercises**

1. What is the chance of exactly 3 heads in 5 tosses?
2. Derive the mean np of the binomial distribution using linearity.
3. 100 photons each have a 0.6 chance of being detected. Find the mean count and its standard deviation.
4. You measure 1000 identical qubits that each give 1 with probability 0.3. How many 1s do you expect, give or take?

### 6.8 The Poisson distribution

**Checks**

- [ ] I can use P(k) = λᵏ e^(−λ)/k! for counts of rare events.

**Exercises**

1. A Geiger counter averages 3 clicks per second. What is the chance of 0 clicks in a second? Of exactly 3?
2. For a Poisson count, the variance equals the mean. What is the relative noise on a count of 100? Of 10,000?
3. A faint star gives 100 photons per exposure. How many photons would you need for 1% precision?
4. Look up Bortkiewicz's data on Prussian cavalry deaths from horse kicks. Why is it a famous Poisson example?

### 6.9 The normal distribution

**Checks**

- [ ] I know the 68-95-99.7 rule and can convert to standard scores.

**Exercises**

1. Heights have mean 175 cm and standard deviation 7 cm. What fraction of people are taller than 189 cm?
2. What is the standard score of a 161 cm person?
3. The oscillator ground state has ψ ∝ e^(−x²/2), so |ψ|² ∝ e^(−x²). What is the standard deviation of the position?

### 6.10 The central limit theorem

**Checks**

- [ ] I can explain why averages of many random things look Gaussian.

**Exercises**

1. In code, plot histograms of the average of 1, 2 and 10 dice over 100,000 trials.
2. You average 100 die rolls. What are the mean and standard deviation of that average?
3. Why are measurement errors often Gaussian, even when no single error source is?

### 6.11 Joint distributions and correlation

**Checks**

- [ ] I can compute covariance and correlation and tell correlation from independence.

**Exercises**

1. Two independent dice: what is the covariance of their values?
2. X is a die roll and Y = 7 − X. What is their correlation?
3. Give an example of two strongly correlated quantities where neither causes the other.
4. Two coins always land opposite. Explain how pre-arranged instructions could cause this. Bell's theorem (15.26) shows quantum correlations cannot always be explained that way.

### 6.12 Random walks and diffusion

**Checks**

- [ ] I can explain why a random walk spreads as √(number of steps).

**Exercises**

1. After 100 random steps of ±1, about how far are you from the start?
2. Simulate 1000 such walkers in code and check your answer.
3. Sugar spreads 1 cm in tea in a minute. About how long to spread 2 cm?
4. A photon in the Sun travels about 1 mm before being scattered in a random direction. The Sun's radius is 7 × 10⁸ m. Estimate the number of steps to escape, then the time. (Light speed 3 × 10⁸ m/s.)

### 6.13 Monte Carlo methods

**Checks**

- [ ] I can estimate a number by random sampling and know how the error shrinks.

**Exercises**

1. Estimate π by throwing random points into a unit square and counting those inside the quarter circle.
2. The error shrinks as 1/√N. About how many points for 3 correct decimals?
3. Look up Buffon's needle and estimate π with real matches and floorboards.

### 6.14 Bayesian and frequentist probability

**Checks**

- [ ] I can explain the two meanings of probability.

**Exercises**

1. What does "70% chance of rain tomorrow" mean to a frequentist and to a Bayesian?
2. A coin gave 7 heads in 10 tosses. Give the frequentist estimate of p, and the Bayesian average of p starting from a uniform prior (the answer is (heads + 1)/(tosses + 2)).
3. Is a Born-rule probability a frequency or a degree of belief? Write your view now and compare it with QBism in 19.6.

### 6.15 Five sigma

**Checks**

- [ ] I can explain what a 5-sigma discovery claims and what it does not.

**Exercises**

1. About how likely is a fluctuation beyond 5σ in one direction by chance?
2. What is the look-elsewhere effect, and why does it matter when searching many energies?
3. Look up the 750 GeV diphoton excess at the LHC (2015 to 2016). What happened to it?

### 6.16 Shannon entropy

**Checks**

- [ ] I can compute entropy in bits and explain what it measures.

**Exercises**

1. Find the entropy of a fair coin and a fair die.
2. Find the entropy of a coin that lands heads 90% of the time.
3. Why can a file full of a biased coin's results be compressed?
4. How many yes/no questions does it take to identify one item out of 1,000,000?

### 6.17 KL divergence and mutual information

**Checks**

- [ ] I can compute KL divergence and explain mutual information.

**Exercises**

1. Find the KL divergence from a fair coin to a 90%-heads coin, D(fair ‖ biased), in bits.
2. Find D(biased ‖ fair). Why is it different?
3. What is the mutual information of two coins that always land the same? Of two independent coins?

## Answer key

- **6.1:** 1. 1/6 and 5/6 2. 1/36; 11/36 3. 16/52 = 4/13 4. About 0.507 5. 1/2.
- **6.2:** 1. 1/3 2. 1/221 3. 1/6 4. Yes: switching wins 2/3 of the time.
- **6.3:** 1. 0.009/(0.009 + 0.0891) ≈ 9% 2. About 50% 3. Most positives come from the large healthy group.
- **6.4:** 1. 3.5 2. Expected gain 0.1 €, slightly favourable 3. 91/6 ≈ 15.17 4. 7 5. 0.5.
- **6.5:** 1. 35/12 ≈ 2.92; about 1.71 2. Mean 5, standard deviation 2 4. √0.75 ≈ 0.87 5. The spread of results over many identically prepared systems.
- **6.6:** 1. 1/2; 0.25 2. Integral 1; mean 3/4 3. 1/4 − 1/(2π) ≈ 0.091 4. 1/λ.
- **6.7:** 1. 10/32 ≈ 0.31 3. 60 and √24 ≈ 4.9 4. 300 ± about 14.5.
- **6.8:** 1. e⁻³ ≈ 0.050; 27e⁻³/6 ≈ 0.22 2. 10%; 1% 3. 10,000 4. Rare independent events fit Poisson closely.
- **6.9:** 1. 189 is 2σ above: about 2.5% 2. −2 3. 1/√2 ≈ 0.71.
- **6.10:** 2. 3.5 and 1.71/10 ≈ 0.17 3. Many small independent errors add up.
- **6.11:** 1. 0 2. −1 3. Ice cream sales and sunburn (both caused by sunny days).
- **6.12:** 1. About √100 = 10 steps 3. About 4 minutes 4. About (7 × 10¹¹)² ≈ 5 × 10²³ steps; about 1.6 × 10¹² s, roughly 50,000 years (published estimates range from 10⁴ to 10⁵ years).
- **6.13:** 2. Around 10⁶ to 10⁷ points.
- **6.14:** 1. Frequentist: on days like this it rains 70% of the time. Bayesian: your confidence in rain is 0.7 2. 0.7 and 8/12 ≈ 0.67.
- **6.15:** 1. About 3 × 10⁻⁷, one in 3.5 million 2. Looking in many places makes a fluke somewhere likely 3. It disappeared with more data.
- **6.16:** 1. 1 bit and log₂ 6 ≈ 2.58 bits 2. About 0.47 bits 3. Each result carries less than 1 bit 4. 20.
- **6.17:** 1. About 0.74 bits 2. About 0.53 bits; KL divergence is not symmetric 3. 1 bit; 0.