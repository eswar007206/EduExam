export interface Question {
  id: string;
  text: string;
  marks: number;
}

export interface Subject {
  id: string;
  name: string;
  questions: Question[];
}

export interface Department {
  id: string;
  name: string;
  subjects: Subject[];
}

export const departments: Department[] = [
  {
    id: "engineering",
    name: "Department of Engineering",
    subjects: [
      {
        id: "computational-mathematics",
        name: "Computational Mathematics – I (CMAT)",
        questions: [
          { id: "cmat-1", text: "Define computational mathematics and explain its importance in engineering.", marks: 5 },
          { id: "cmat-2", text: "What are algebraic and transcendental equations? Give examples.", marks: 5 },
          { id: "cmat-3", text: "Explain the Bisection Method for finding roots of equations.", marks: 5 },
          { id: "cmat-4", text: "What is the Newton-Raphson Method? Write its formula and discuss its convergence.", marks: 5 },
          { id: "cmat-5", text: "Compare Bisection and Regula Falsi methods.", marks: 5 },
          { id: "cmat-6", text: "What are the limitations of iterative methods?", marks: 5 },
          { id: "cmat-7", text: "Explain the concept of error and its types in numerical computation.", marks: 5 },
          { id: "cmat-8", text: "What is the difference between absolute error and relative error?", marks: 5 },
          { id: "cmat-9", text: "Define interpolation and explain its applications.", marks: 5 },
          { id: "cmat-10", text: "Derive Newton's Forward Interpolation Formula.", marks: 5 },
          { id: "cmat-11", text: "What is Newton's Backward Interpolation Formula?", marks: 5 },
          { id: "cmat-12", text: "Explain Lagrange's Interpolation Method with an example.", marks: 5 },
          { id: "cmat-13", text: "Define numerical differentiation. How is it applied in computational mathematics?", marks: 5 },
          { id: "cmat-14", text: "Explain how finite differences are used in differentiation.", marks: 5 },
          { id: "cmat-15", text: "What is numerical integration? Give examples of real-world applications.", marks: 5 },
          { id: "cmat-16", text: "Derive Trapezoidal Rule for numerical integration.", marks: 5 },
          { id: "cmat-17", text: "Explain Simpson's 1/3rd Rule and 3/8th Rule.", marks: 5 },
          { id: "cmat-18", text: "What is the significance of order of convergence in numerical methods?", marks: 5 },
          { id: "cmat-19", text: "Define eigenvalues and eigenvectors and explain their computational importance.", marks: 5 },
          { id: "cmat-20", text: "What are matrix factorizations? Explain LU decomposition.", marks: 5 },
          { id: "cmat-21", text: "Define Gauss Elimination Method and its steps.", marks: 5 },
          { id: "cmat-22", text: "What is Gauss-Seidel Iteration Method?", marks: 5 },
          { id: "cmat-23", text: "Explain how linear equations are solved using matrices.", marks: 5 },
          { id: "cmat-24", text: "Define least squares method and its use in data fitting.", marks: 5 },
          { id: "cmat-25", text: "What is numerical solution of ordinary differential equations?", marks: 5 },
          { id: "cmat-26", text: "Explain Euler's Method for solving ODEs.", marks: 5 },
          { id: "cmat-27", text: "What is the Runge-Kutta Method? How does it improve accuracy?", marks: 5 },
          { id: "cmat-28", text: "Discuss applications of computational mathematics in engineering design.", marks: 5 },
          { id: "cmat-29", text: "How does round-off error affect numerical computation?", marks: 5 },
          { id: "cmat-30", text: "What are the advantages and limitations of numerical methods compared to analytical methods?", marks: 5 }
        ]
      },
      {
        id: "physics-for-engineers",
        name: "Physics for Engineers (PHY)",
        questions: [
          { id: "phy-1", text: "Define scalar and vector quantities with examples.", marks: 5 },
          { id: "phy-2", text: "Explain the concept of motion in one dimension.", marks: 5 },
          { id: "phy-3", text: "What is Newton's Second Law of Motion?", marks: 5 },
          { id: "phy-4", text: "Define work, power, and energy.", marks: 5 },
          { id: "phy-5", text: "Explain the principle of conservation of energy.", marks: 5 },
          { id: "phy-6", text: "What are elastic and inelastic collisions?", marks: 5 },
          { id: "phy-7", text: "Define simple harmonic motion and give examples.", marks: 5 },
          { id: "phy-8", text: "Explain the concept of resonance.", marks: 5 },
          { id: "phy-9", text: "What are longitudinal and transverse waves?", marks: 5 },
          { id: "phy-10", text: "Define interference and diffraction of light.", marks: 5 },
          { id: "phy-11", text: "Explain the working principle of a laser.", marks: 5 },
          { id: "phy-12", text: "What is the difference between spontaneous and stimulated emission?", marks: 5 },
          { id: "phy-13", text: "Describe the concept of polarization of light.", marks: 5 },
          { id: "phy-14", text: "Explain the basics of quantum mechanics.", marks: 5 },
          { id: "phy-15", text: "What are energy bands in solids?", marks: 5 },
          { id: "phy-16", text: "Define semiconductors and their types.", marks: 5 },
          { id: "phy-17", text: "Explain the Hall effect and its significance.", marks: 5 },
          { id: "phy-18", text: "What is the concept of superconductivity?", marks: 5 },
          { id: "phy-19", text: "Define electric potential and electric field.", marks: 5 },
          { id: "phy-20", text: "Explain Gauss's Law and its applications.", marks: 5 },
          { id: "phy-21", text: "Define capacitance and derive the formula for a parallel plate capacitor.", marks: 5 },
          { id: "phy-22", text: "What are magnetic materials?", marks: 5 },
          { id: "phy-23", text: "Explain Faraday's Law of Electromagnetic Induction.", marks: 5 },
          { id: "phy-24", text: "Describe Lenz's Law.", marks: 5 },
          { id: "phy-25", text: "What is the difference between AC and DC current?", marks: 5 },
          { id: "phy-26", text: "Define impedance and reactance.", marks: 5 },
          { id: "phy-27", text: "Explain the concept of diffraction grating.", marks: 5 },
          { id: "phy-28", text: "What is the photoelectric effect?", marks: 5 },
          { id: "phy-29", text: "Define refractive index and explain Snell's law.", marks: 5 },
          { id: "phy-30", text: "Discuss applications of physics in modern engineering.", marks: 5 }
        ]
      },
      {
        id: "linux-shell-scripting",
        name: "Linux and Shell Scripting (Linux)",
        questions: [
          { id: "linux-1", text: "What is Linux and how is it different from other operating systems?", marks: 5 },
          { id: "linux-2", text: "Explain the structure of the Linux file system.", marks: 5 },
          { id: "linux-3", text: "What is the role of the kernel in Linux?", marks: 5 },
          { id: "linux-4", text: "Define shell and its types.", marks: 5 },
          { id: "linux-5", text: "Explain the booting process of a Linux system.", marks: 5 },
          { id: "linux-6", text: "What are Linux file permissions?", marks: 5 },
          { id: "linux-7", text: "How do you change file ownership and permissions?", marks: 5 },
          { id: "linux-8", text: "What is the difference between absolute and relative paths?", marks: 5 },
          { id: "linux-9", text: "Explain the concept of environment variables.", marks: 5 },
          { id: "linux-10", text: "What are common Linux commands for file management?", marks: 5 },
          { id: "linux-11", text: "Define process and explain process management in Linux.", marks: 5 },
          { id: "linux-12", text: "What is the difference between a process and a thread?", marks: 5 },
          { id: "linux-13", text: "How do you view and kill processes in Linux?", marks: 5 },
          { id: "linux-14", text: "Explain the purpose of the grep command.", marks: 5 },
          { id: "linux-15", text: "What is the use of awk and sed commands?", marks: 5 },
          { id: "linux-16", text: "Explain the use of pipes and redirection.", marks: 5 },
          { id: "linux-17", text: "What is a shell script?", marks: 5 },
          { id: "linux-18", text: "How do you create and execute a shell script?", marks: 5 },
          { id: "linux-19", text: "What are conditional statements in shell scripting?", marks: 5 },
          { id: "linux-20", text: "Explain the use of loops in shell scripting.", marks: 5 },
          { id: "linux-21", text: "How are functions defined and used in shell scripts?", marks: 5 },
          { id: "linux-22", text: "What is command substitution?", marks: 5 },
          { id: "linux-23", text: "Explain how to handle user input in shell scripts.", marks: 5 },
          { id: "linux-24", text: "What are positional parameters?", marks: 5 },
          { id: "linux-25", text: "Describe error handling in shell scripts.", marks: 5 },
          { id: "linux-26", text: "How do you automate system tasks using cron jobs?", marks: 5 },
          { id: "linux-27", text: "What is the use of wildcards in Linux?", marks: 5 },
          { id: "linux-28", text: "Define the concept of root privileges.", marks: 5 },
          { id: "linux-29", text: "What is a symbolic link?", marks: 5 },
          { id: "linux-30", text: "Discuss the advantages of shell scripting in automation.", marks: 5 }
        ]
      },
      {
        id: "problem-solving-lab",
        name: "Problem Solving Lab - I (with C) (CPL)",
        questions: [
          { id: "cpl-1", text: "What is the purpose of laboratory exercises in programming?", marks: 5 },
          { id: "cpl-2", text: "Explain the process of writing and compiling a C program.", marks: 5 },
          { id: "cpl-3", text: "How do you test and debug a C program?", marks: 5 },
          { id: "cpl-4", text: "What are input/output functions in C?", marks: 5 },
          { id: "cpl-5", text: "Write the steps involved in designing a program to find factorial of a number.", marks: 5 },
          { id: "cpl-6", text: "Explain the logic for checking prime numbers.", marks: 5 },
          { id: "cpl-7", text: "Describe how to implement loops in lab programs.", marks: 5 },
          { id: "cpl-8", text: "What is the role of conditional statements in problem solving?", marks: 5 },
          { id: "cpl-9", text: "How can arrays be used in solving real-world problems?", marks: 5 },
          { id: "cpl-10", text: "Write an algorithm to find the sum of digits of a number.", marks: 5 },
          { id: "cpl-11", text: "Explain the concept of nested loops using a pattern program.", marks: 5 },
          { id: "cpl-12", text: "How do you implement searching algorithms in C?", marks: 5 },
          { id: "cpl-13", text: "Explain the logic of bubble sort.", marks: 5 },
          { id: "cpl-14", text: "How do you reverse a string using C?", marks: 5 },
          { id: "cpl-15", text: "Write a program logic for matrix addition.", marks: 5 },
          { id: "cpl-16", text: "Explain 2D array representation and manipulation.", marks: 5 },
          { id: "cpl-17", text: "What is the use of functions in programming labs?", marks: 5 },
          { id: "cpl-18", text: "How to pass arguments to functions?", marks: 5 },
          { id: "cpl-19", text: "Explain recursive function with example.", marks: 5 },
          { id: "cpl-20", text: "Write logic to check palindrome using C.", marks: 5 },
          { id: "cpl-21", text: "How do you read and write data from files in C?", marks: 5 },
          { id: "cpl-22", text: "What are pointer applications in lab exercises?", marks: 5 },
          { id: "cpl-23", text: "Describe how to dynamically allocate memory in a program.", marks: 5 },
          { id: "cpl-24", text: "How do you handle user input validation?", marks: 5 },
          { id: "cpl-25", text: "Explain step-by-step debugging of a C program.", marks: 5 },
          { id: "cpl-26", text: "Write algorithm for finding Fibonacci series.", marks: 5 },
          { id: "cpl-27", text: "Explain how to design modular programs in C.", marks: 5 },
          { id: "cpl-28", text: "What are common syntax errors in C programs?", marks: 5 },
          { id: "cpl-29", text: "How do you document and comment code effectively?", marks: 5 },
          { id: "cpl-30", text: "What are the best practices to follow in lab programming?", marks: 5 }
        ]
      },
      {
        id: "computer-organization",
        name: "Computer Organization (CO)",
        questions: [
          { id: "co-1", text: "Define computer organization and computer architecture.", marks: 5 },
          { id: "co-2", text: "Explain the basic functional units of a computer.", marks: 5 },
          { id: "co-3", text: "What is the role of the control unit?", marks: 5 },
          { id: "co-4", text: "Describe the instruction cycle.", marks: 5 },
          { id: "co-5", text: "What are addressing modes?", marks: 5 },
          { id: "co-6", text: "Explain various types of instruction formats.", marks: 5 },
          { id: "co-7", text: "What is a register? Explain its types.", marks: 5 },
          { id: "co-8", text: "Define memory hierarchy.", marks: 5 },
          { id: "co-9", text: "Explain the difference between primary and secondary memory.", marks: 5 },
          { id: "co-10", text: "What is cache memory and how does it improve performance?", marks: 5 },
          { id: "co-11", text: "Explain the concept of virtual memory.", marks: 5 },
          { id: "co-12", text: "What is the difference between RISC and CISC architectures?", marks: 5 },
          { id: "co-13", text: "Define micro-operations and their types.", marks: 5 },
          { id: "co-14", text: "What is an ALU and what are its functions?", marks: 5 },
          { id: "co-15", text: "Explain the working of a bus system.", marks: 5 },
          { id: "co-16", text: "What is a pipeline in computer architecture?", marks: 5 },
          { id: "co-17", text: "Explain the concept of instruction-level parallelism.", marks: 5 },
          { id: "co-18", text: "Define input/output organization.", marks: 5 },
          { id: "co-19", text: "What are interrupts and their types?", marks: 5 },
          { id: "co-20", text: "Explain the concept of DMA (Direct Memory Access).", marks: 5 },
          { id: "co-21", text: "Describe the working of I/O ports.", marks: 5 },
          { id: "co-22", text: "What is a memory-mapped I/O system?", marks: 5 },
          { id: "co-23", text: "Define stack organization and its use.", marks: 5 },
          { id: "co-24", text: "Explain hardwired and microprogrammed control units.", marks: 5 },
          { id: "co-25", text: "What are the different types of storage devices?", marks: 5 },
          { id: "co-26", text: "Explain the concept of instruction pipelining.", marks: 5 },
          { id: "co-27", text: "What is cache mapping?", marks: 5 },
          { id: "co-28", text: "Explain the concept of addressing in CPU.", marks: 5 },
          { id: "co-29", text: "What are the performance metrics of a computer?", marks: 5 },
          { id: "co-30", text: "Discuss the role of computer organization in system design.", marks: 5 }
        ]
      },
      {
        id: "Computer-Networking",
        name: "Computer Networking",
        questions: [
          { id: "dc-1", text: "What are the operations of TCP flow control, and what benefits does it provide?", marks: 5 },
          { id: "dc-2", text: "Explain the function and structure of the TCP sliding window protocol.", marks: 5 },
          { id: "dc-3", text: "How does TCP handle congestion in the network?", marks: 5 },
          { id: "dc-4", text: "What is congestion control and how does the transport layer manage it?", marks: 5 },
          { id: "dc-5", text: "How does TCP retransmit lost packets or acknowledgments?", marks: 5 },
          { id: "dc-6", text: "What mechanism does TCP use to detect and recover from errors?", marks: 5 },
          { id: "dc-7", text: "Explain how Karn/Partridge Algorithm estimates Round Trip Time (RTT).", marks: 5 },
          { id: "dc-8", text: "How does the Jacobson/Karels Algorithm refine RTT estimation over Karn/Partridge?", marks: 5 },
          { id: "dc-9", text: "What is fast retransmission in TCP and when is it triggered?", marks: 5 },
          { id: "dc-10", text: "How do duplicate acknowledgments aid in fast retransmission?", marks: 5 },
          { id: "dc-11", text: "Describe multiplexing and demultiplexing in transport layer with examples.", marks: 5 },
          { id: "dc-12", text: "What do you mean by demultiplexing in the transport layer?", marks: 5 },
          { id: "dc-13", text: "Describe the process and need for multiplexing with a suitable example.", marks: 5 },
          { id: "dc-14", text: "Explain the key fields of a TCP header and their significance.", marks: 5 },
          { id: "dc-15", text: "How do different fields in the TCP header support flow control?", marks: 5 }
        ]
      }
    ]
  },
  {
    id: "commerce",
    name: "Department of Commerce",
    subjects: [
      {
        id: "financial-accounting",
        name: "Financial Accounting",
        questions: [
          { id: "fa-1", text: "What are the main objectives of financial accounting?", marks: 5 },
          { id: "fa-2", text: "Explain the difference between accounting and bookkeeping.", marks: 5 },
          { id: "fa-3", text: "What are the fundamental accounting principles?", marks: 5 },
          { id: "fa-4", text: "Define assets, liabilities, and owner's equity.", marks: 5 },
          { id: "fa-5", text: "What is the accounting equation and why is it important?", marks: 5 },
          { id: "fa-6", text: "Explain the double-entry bookkeeping system.", marks: 5 },
          { id: "fa-7", text: "What is a trial balance and why is it prepared?", marks: 5 },
          { id: "fa-8", text: "Differentiate between capital expenditure and revenue expenditure.", marks: 5 },
          { id: "fa-9", text: "What are adjusting entries and why are they necessary?", marks: 5 },
          { id: "fa-10", text: "Explain the concept of depreciation and its methods.", marks: 5 },
          { id: "fa-11", text: "What is the purpose of a balance sheet?", marks: 5 },
          { id: "fa-12", text: "Describe the components of an income statement.", marks: 5 },
          { id: "fa-13", text: "What is a cash flow statement and its importance?", marks: 5 },
          { id: "fa-14", text: "Explain the concept of materiality in accounting.", marks: 5 },
          { id: "fa-15", text: "What are the different types of financial statements?", marks: 5 }
        ]
      },
      {
        id: "management-foundation",
        name: "Management Foundation",
        questions: [
          { id: "mf-1", text: "Define management and explain its importance.", marks: 5 },
          { id: "mf-2", text: "What are the main functions of management?", marks: 5 },
          { id: "mf-3", text: "Explain the planning process in management.", marks: 5 },
          { id: "mf-4", text: "What is organizational structure and its types?", marks: 5 },
          { id: "mf-5", text: "Define leadership and its different styles.", marks: 5 },
          { id: "mf-6", text: "What is motivation and its theories?", marks: 5 },
          { id: "mf-7", text: "Explain the decision-making process in management.", marks: 5 },
          { id: "mf-8", text: "What is strategic management and its components?", marks: 5 },
          { id: "mf-9", text: "Define control and its importance in management.", marks: 5 },
          { id: "mf-10", text: "What are the principles of management by Fayol?", marks: 5 },
          { id: "mf-11", text: "Explain the concept of MBO (Management by Objectives).", marks: 5 },
          { id: "mf-12", text: "What is organizational behavior and its importance?", marks: 5 },
          { id: "mf-13", text: "Define conflict management and its resolution strategies.", marks: 5 },
          { id: "mf-14", text: "What is change management and its process?", marks: 5 },
          { id: "mf-15", text: "Explain corporate social responsibility in management.", marks: 5 }
        ]
      }
    ]
  }
];
