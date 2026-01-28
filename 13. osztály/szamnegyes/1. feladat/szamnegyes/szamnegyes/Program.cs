using System;
using System.Linq;

class GridPuzzle
{
    static void Main()
    {
        int[,] table1 = {
            {1, 2, 1},
            {2, 4, 2},
            {1, 2, 1}
        };

        Console.WriteLine("Test 1:");
        PrintTable(table1);
        int[] result1 = SolveGrid(table1);
        Console.WriteLine($"Result: [{string.Join(", ", result1)}]");
        Console.WriteLine($"Expected: [1, 1, 1, 1]\n");

        int[,] table2 = {
            {3, 7, 4},
            {5, 16, 11},
            {2, 9, 7}
        };

        Console.WriteLine("Test 2:");
        PrintTable(table2);
        int[] result2 = SolveGrid(table2);
        Console.WriteLine($"Result: [{string.Join(", ", result2)}]");
        Console.WriteLine($"Expected: [3, 4, 2, 7]\n");

        int[,] table3 = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };

        Console.WriteLine("Test 3 (Invalid):");
        PrintTable(table3);
        int[] result3 = SolveGrid(table3);
        Console.WriteLine($"Result: [{string.Join(", ", result3)}]");
        Console.WriteLine($"Expected: [-1]\n");
    }

    static int[] SolveGrid(int[,] table)
    {

        int pos00 = table[0, 0];  
        int pos01 = table[0, 1];  
        int pos02 = table[0, 2];  
        int pos10 = table[1, 0];  
        int pos11 = table[1, 1];  
        int pos12 = table[1, 2];  
        int pos20 = table[2, 0];  
        int pos21 = table[2, 1];  
        int pos22 = table[2, 2]; 

        int A = pos00;
        int B = pos02;
        int C = pos20;
        int D = pos22;

        if (!IsValid(table, A, B, C, D))
        {
            return new int[] { -1 };
        }

        return new int[] { A, B, C, D };
    }

    static bool IsValid(int[,] table, int A, int B, int C, int D)
    {
        if (table[0, 0] != A) return false;
        if (table[0, 1] != A + B) return false;
        if (table[0, 2] != B) return false;
        if (table[1, 0] != A + C) return false;
        if (table[1, 1] != A + B + C + D) return false;
        if (table[1, 2] != B + D) return false;
        if (table[2, 0] != C) return false;
        if (table[2, 1] != C + D) return false;
        if (table[2, 2] != D) return false;

        return true;
    }

    static void PrintTable(int[,] table)
    {
        Console.WriteLine("Table:");
        for (int i = 0; i < 3; i++)
        {
            Console.WriteLine($"[{table[i, 0],2}, {table[i, 1],2}, {table[i, 2],2}]");
        }
    }
}