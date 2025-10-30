import React from "react";

const OOPSection = ({ copyCode, copiedCode }) => (
  <section style={{ marginBottom: "2rem" }}>
    <div className="card">
      <h2>
        <i className="fas fa-object-group"></i> 9. Object-Oriented Programming Concepts
      </h2>
      <p>
        Java is a pure object-oriented language built on four fundamental pillars. 
        OOP helps organize code into reusable, maintainable, and scalable structures.
      </p>

      <h3>🔹 The Four Pillars of OOP</h3>

      <div style={{background: '#f0f9ff', border: '1px solid #bae6fd', padding: '1rem', margin: '1rem 0', borderRadius: '8px'}}>
        <h4 style={{marginTop: 0, color: '#0369a1'}}>1. Encapsulation</h4>
        <p>Bundling data (fields) and methods that operate on the data into a single unit (class), while hiding internal details.</p>
        <ul>
          <li>✅ Use <code>private</code> fields and <code>public</code> getter/setter methods</li>
          <li>✅ Protects data from unauthorized access</li>
          <li>✅ Provides better control over data modification</li>
        </ul>
      </div>

      <div style={{background: '#fef3c7', border: '1px solid #fde68a', padding: '1rem', margin: '1rem 0', borderRadius: '8px'}}>
        <h4 style={{marginTop: 0, color: '#92400e'}}>2. Inheritance</h4>
        <p>Mechanism where a new class (child/subclass) inherits properties and behaviors from an existing class (parent/superclass).</p>
        <ul>
          <li>✅ Promotes code reusability</li>
          <li>✅ Establishes "IS-A" relationship (e.g., Dog IS-A Animal)</li>
          <li>✅ Use <code>extends</code> keyword</li>
        </ul>
      </div>

      <div style={{background: '#f3e8ff', border: '1px solid #e9d5ff', padding: '1rem', margin: '1rem 0', borderRadius: '8px'}}>
        <h4 style={{marginTop: 0, color: '#6b21a8'}}>3. Polymorphism</h4>
        <p>"Many forms" - ability of objects to take multiple forms. Includes method overloading and method overriding.</p>
        <ul>
          <li>✅ <strong>Compile-time:</strong> Method overloading (same name, different parameters)</li>
          <li>✅ <strong>Runtime:</strong> Method overriding (child class redefines parent method)</li>
          <li>✅ Enhances flexibility and scalability</li>
        </ul>
      </div>

      <div style={{background: '#fce7f3', border: '1px solid #fbcfe8', padding: '1rem', margin: '1rem 0', borderRadius: '8px'}}>
        <h4 style={{marginTop: 0, color: '#9f1239'}}>4. Abstraction</h4>
        <p>Hiding complex implementation details and showing only essential features to the user.</p>
        <ul>
          <li>✅ Achieved through abstract classes and interfaces</li>
          <li>✅ Focuses on "what" rather than "how"</li>
          <li>✅ Reduces code complexity</li>
        </ul>
      </div>

      <h3>Comprehensive OOP Example</h3>
      <div className="code-container">
        <button
          className={`copy-btn ${copiedCode === "oop_code" ? "copied" : ""}`}
          onClick={() =>
            copyCode(
`// OOPExample.java
// Demonstrates all four OOP pillars

// ========== ENCAPSULATION ==========
class BankAccount {
    // Private fields (data hiding)
    private String accountNumber;
    private double balance;
    private String accountHolderName;

    // Constructor
    public BankAccount(String accountNumber, String holderName, double initialBalance) {
        this.accountNumber = accountNumber;
        this.accountHolderName = holderName;
        this.balance = initialBalance;
    }

    // Public getter methods (controlled access)
    public double getBalance() {
        return balance;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    // Public methods (controlled operations)
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println("Deposited: $" + amount);
        } else {
            System.out.println("Invalid deposit amount");
        }
    }

    public void withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            System.out.println("Withdrawn: $" + amount);
        } else {
            System.out.println("Insufficient balance or invalid amount");
        }
    }

    // Method to be overridden (polymorphism)
    public void printAccountType() {
        System.out.println("Generic Bank Account");
    }

    public void displayInfo() {
        System.out.println("Account: " + accountNumber + " | Holder: " + accountHolderName + " | Balance: $" + balance);
    }
}

// ========== INHERITANCE ==========
class SavingsAccount extends BankAccount {
    private double interestRate;
    private int minimumBalance;

    public SavingsAccount(String acc, String holder, double bal, double rate) {
        super(acc, holder, bal); // Call parent constructor
        this.interestRate = rate;
        this.minimumBalance = 500;
    }

    // Additional method specific to SavingsAccount
    public void addInterest() {
        double interest = getBalance() * interestRate / 100;
        deposit(interest);
        System.out.println("Interest added: $" + interest);
    }

    // ========== POLYMORPHISM (Method Overriding) ==========
    @Override
    public void printAccountType() {
        System.out.println("Savings Account | Interest Rate: " + interestRate + "%");
    }

    // ========== POLYMORPHISM (Method Overriding) ==========
    @Override
    public void withdraw(double amount) {
        if (getBalance() - amount >= minimumBalance) {
            super.withdraw(amount);
        } else {
            System.out.println("Cannot withdraw: Minimum balance of $" + minimumBalance + " required");
        }
    }
}

class CurrentAccount extends BankAccount {
    private double overdraftLimit;

    public CurrentAccount(String acc, String holder, double bal, double overdraft) {
        super(acc, holder, bal);
        this.overdraftLimit = overdraft;
    }

    @Override
    public void printAccountType() {
        System.out.println("Current Account | Overdraft Limit: $" + overdraftLimit);
    }

    @Override
    public void withdraw(double amount) {
        if (amount <= getBalance() + overdraftLimit) {
            super.withdraw(amount);
        } else {
            System.out.println("Exceeds overdraft limit");
        }
    }
}

// ========== ABSTRACTION (will be demonstrated with interfaces) ==========

public class OOPExample {
    public static void main(String[] args) {
        System.out.println("=== OOP Demonstration ===\\n");

        // Creating objects
        BankAccount generic = new BankAccount("BA001", "John Doe", 1000);
        SavingsAccount savings = new SavingsAccount("SA123", "Alice Smith", 5000, 3.5);
        CurrentAccount current = new CurrentAccount("CA456", "Bob Johnson", 2000, 1000);

        // Encapsulation: Using public methods to access private data
        System.out.println("--- Encapsulation ---");
        generic.displayInfo();
        generic.deposit(500);
        generic.displayInfo();
        System.out.println();

        // Inheritance: SavingsAccount inherits from BankAccount
        System.out.println("--- Inheritance ---");
        savings.displayInfo();
        savings.addInterest(); // Method specific to child class
        savings.displayInfo();
        System.out.println();

        // Polymorphism: Same method, different behavior
        System.out.println("--- Polymorphism (Runtime) ---");
        BankAccount[] accounts = {generic, savings, current};
        for (BankAccount acc : accounts) {
            acc.printAccountType(); // Different output for each type
        }
        System.out.println();

        // Polymorphism: Overridden withdraw behavior
        System.out.println("--- Polymorphism (Method Overriding) ---");
        savings.withdraw(4600); // Respects minimum balance
        current.withdraw(2500); // Uses overdraft limit
        System.out.println();

        // Final states
        System.out.println("--- Final Account States ---");
        generic.displayInfo();
        savings.displayInfo();
        current.displayInfo();
    }
}`,
              "oop_code"
            )
          }
        >
          {copiedCode === "oop_code" ? "Copied!" : "Copy"}
        </button>

        <pre>{`// OOPExample.java
// Demonstrates all four OOP pillars

// ========== ENCAPSULATION ==========
class BankAccount {
    // Private fields (data hiding)
    private String accountNumber;
    private double balance;
    private String accountHolderName;

    // Constructor
    public BankAccount(String accountNumber, String holderName, double initialBalance) {
        this.accountNumber = accountNumber;
        this.accountHolderName = holderName;
        this.balance = initialBalance;
    }

    // Public getter methods (controlled access)
    public double getBalance() {
        return balance;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    // Public methods (controlled operations)
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println("Deposited: $" + amount);
        } else {
            System.out.println("Invalid deposit amount");
        }
    }

    public void withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            System.out.println("Withdrawn: $" + amount);
        } else {
            System.out.println("Insufficient balance or invalid amount");
        }
    }

    // Method to be overridden (polymorphism)
    public void printAccountType() {
        System.out.println("Generic Bank Account");
    }

    public void displayInfo() {
        System.out.println("Account: " + accountNumber + " | Holder: " + accountHolderName + " | Balance: $" + balance);
    }
}

// ========== INHERITANCE ==========
class SavingsAccount extends BankAccount {
    private double interestRate;
    private int minimumBalance;

    public SavingsAccount(String acc, String holder, double bal, double rate) {
        super(acc, holder, bal); // Call parent constructor
        this.interestRate = rate;
        this.minimumBalance = 500;
    }

    // Additional method specific to SavingsAccount
    public void addInterest() {
        double interest = getBalance() * interestRate / 100;
        deposit(interest);
        System.out.println("Interest added: $" + interest);
    }

    // ========== POLYMORPHISM (Method Overriding) ==========
    @Override
    public void printAccountType() {
        System.out.println("Savings Account | Interest Rate: " + interestRate + "%");
    }

    @Override
    public void withdraw(double amount) {
        if (getBalance() - amount >= minimumBalance) {
            super.withdraw(amount);
        } else {
            System.out.println("Cannot withdraw: Minimum balance of $" + minimumBalance + " required");
        }
    }
}

class CurrentAccount extends BankAccount {
    private double overdraftLimit;

    public CurrentAccount(String acc, String holder, double bal, double overdraft) {
        super(acc, holder, bal);
        this.overdraftLimit = overdraft;
    }

    @Override
    public void printAccountType() {
        System.out.println("Current Account | Overdraft Limit: $" + overdraftLimit);
    }

    @Override
    public void withdraw(double amount) {
        if (amount <= getBalance() + overdraftLimit) {
            super.withdraw(amount);
        } else {
            System.out.println("Exceeds overdraft limit");
        }
    }
}

public class OOPExample {
    public static void main(String[] args) {
        System.out.println("=== OOP Demonstration ===\\n");

        // Creating objects
        BankAccount generic = new BankAccount("BA001", "John Doe", 1000);
        SavingsAccount savings = new SavingsAccount("SA123", "Alice Smith", 5000, 3.5);
        CurrentAccount current = new CurrentAccount("CA456", "Bob Johnson", 2000, 1000);

        // Encapsulation: Using public methods to access private data
        System.out.println("--- Encapsulation ---");
        generic.displayInfo();
        generic.deposit(500);
        generic.displayInfo();
        System.out.println();

        // Inheritance: SavingsAccount inherits from BankAccount
        System.out.println("--- Inheritance ---");
        savings.displayInfo();
        savings.addInterest(); // Method specific to child class
        savings.displayInfo();
        System.out.println();

        // Polymorphism: Same method, different behavior
        System.out.println("--- Polymorphism (Runtime) ---");
        BankAccount[] accounts = {generic, savings, current};
        for (BankAccount acc : accounts) {
            acc.printAccountType(); // Different output for each type
        }
        System.out.println();

        // Polymorphism: Overridden withdraw behavior
        System.out.println("--- Polymorphism (Method Overriding) ---");
        savings.withdraw(4600); // Respects minimum balance
        current.withdraw(2500); // Uses overdraft limit
        System.out.println();

        // Final states
        System.out.println("--- Final Account States ---");
        generic.displayInfo();
        savings.displayInfo();
        current.displayInfo();
    }
}`}</pre>
      </div>

      <div style={{background: '#e0f2fe', borderLeft: '4px solid #0284c7', padding: '1rem 1.5rem', margin: '1.5rem 0', borderRadius: '0 12px 12px 0'}}>
        <strong>💡 Key Takeaways:</strong>
        <ul style={{marginTop: '0.5rem', marginBottom: 0}}>
          <li><strong>Encapsulation:</strong> Private fields with public getters/setters protect data integrity</li>
          <li><strong>Inheritance:</strong> SavingsAccount and CurrentAccount reuse BankAccount code</li>
          <li><strong>Polymorphism:</strong> Different account types behave differently with same method calls</li>
          <li><strong>Abstraction:</strong> Users interact with simple methods without knowing internal complexity</li>
        </ul>
      </div>

      <h3>Benefits of OOP</h3>
      <ul>
        <li>🔄 <strong>Code Reusability:</strong> Write once, use multiple times through inheritance</li>
        <li>🔒 <strong>Data Security:</strong> Encapsulation protects sensitive information</li>
        <li>🧩 <strong>Modularity:</strong> Break complex problems into smaller, manageable pieces</li>
        <li>🔧 <strong>Maintainability:</strong> Changes in one class don't affect others</li>
        <li>📈 <strong>Scalability:</strong> Easy to add new features without breaking existing code</li>
      </ul>
    </div>
  </section>
);

export default OOPSection;
