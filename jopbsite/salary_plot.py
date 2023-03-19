import matplotlib.pyplot as plt

# Hypothetical data
years = list(range(2010, 2022))
salaries = [40000, 42000, 45000, 47000, 48000, 50000, 53000, 56000, 58000, 61000, 64000, 67000]

# Create the plot
plt.plot(years, salaries, marker='o', linestyle='-', color='blue')

# Set title and labels
plt.title("IT Sector Salary Trends in Ireland (2010-2021)")
plt.xlabel("Years")
plt.ylabel("Average Salary (EUR)")

# Customize the plot
plt.grid(True)
plt.xticks(years)
plt.yticks(range(40000, 68000, 5000))

# Save the plot as an image file
plt.savefig("salary_trends.png", dpi=300)

# Show the plot
plt.show()
