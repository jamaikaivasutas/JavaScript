using System;
using System.Drawing;
using System.Windows.Forms;

namespace szamnegyes
{
    public class GridGameForm : Form
    {
        private int[,] grid = new int[3, 3];
        private Label[,] labels = new Label[3, 3];
        private Button btnA, btnB, btnC, btnD, btnReset;

        public GridGameForm()
        {
            InitializeComponent();
        }

        private void InitializeComponent()
        {
            this.Text = "Grid Game";
            this.Size = new Size(350, 400);
            this.StartPosition = FormStartPosition.CenterScreen;

            // Create 3x3 grid of labels
            int startX = 50;
            int startY = 50;
            int cellSize = 60;

            for (int i = 0; i < 3; i++)
            {
                for (int j = 0; j < 3; j++)
                {
                    labels[i, j] = new Label
                    {
                        Text = "0",
                        Location = new Point(startX + j * cellSize, startY + i * cellSize),
                        Size = new Size(cellSize - 2, cellSize - 2),
                        BorderStyle = BorderStyle.FixedSingle,
                        TextAlign = ContentAlignment.MiddleCenter,
                        Font = new Font("Arial", 16, FontStyle.Bold),
                        BackColor = Color.WhiteSmoke
                    };
                    this.Controls.Add(labels[i, j]);
                }
            }

            // Create buttons
            int buttonY = startY + 3 * cellSize + 20;
            int buttonWidth = 60;
            int buttonSpacing = 10;

            btnA = new Button
            {
                Text = "A",
                Location = new Point(startX, buttonY),
                Size = new Size(buttonWidth, 40),
                Font = new Font("Arial", 12, FontStyle.Bold)
            };
            btnA.Click += (s, e) => PressButton('A');
            this.Controls.Add(btnA);

            btnB = new Button
            {
                Text = "B",
                Location = new Point(startX + buttonWidth + buttonSpacing, buttonY),
                Size = new Size(buttonWidth, 40),
                Font = new Font("Arial", 12, FontStyle.Bold)
            };
            btnB.Click += (s, e) => PressButton('B');
            this.Controls.Add(btnB);

            btnC = new Button
            {
                Text = "C",
                Location = new Point(startX + 2 * (buttonWidth + buttonSpacing), buttonY),
                Size = new Size(buttonWidth, 40),
                Font = new Font("Arial", 12, FontStyle.Bold)
            };
            btnC.Click += (s, e) => PressButton('C');
            this.Controls.Add(btnC);

            btnD = new Button
            {
                Text = "D",
                Location = new Point(startX + 3 * (buttonWidth + buttonSpacing), buttonY),
                Size = new Size(buttonWidth, 40),
                Font = new Font("Arial", 12, FontStyle.Bold)
            };
            btnD.Click += (s, e) => PressButton('D');
            this.Controls.Add(btnD);

            // Reset button
            btnReset = new Button
            {
                Text = "Reset",
                Location = new Point(startX + 60, buttonY + 50),
                Size = new Size(100, 40),
                Font = new Font("Arial", 12, FontStyle.Bold),
                BackColor = Color.LightCoral
            };
            btnReset.Click += (s, e) => Reset();
            this.Controls.Add(btnReset);
        }

        private void PressButton(char button)
        {
            switch (button)
            {
                case 'A': // Top-left 2x2
                    grid[0, 0]++;
                    grid[0, 1]++;
                    grid[1, 0]++;
                    grid[1, 1]++;
                    break;
                case 'B': // Top-right 2x2
                    grid[0, 1]++;
                    grid[0, 2]++;
                    grid[1, 1]++;
                    grid[1, 2]++;
                    break;
                case 'C': // Bottom-left 2x2
                    grid[1, 0]++;
                    grid[1, 1]++;
                    grid[2, 0]++;
                    grid[2, 1]++;
                    break;
                case 'D': // Bottom-right 2x2
                    grid[1, 1]++;
                    grid[1, 2]++;
                    grid[2, 1]++;
                    grid[2, 2]++;
                    break;
            }

            UpdateDisplay();
        }

        private void Reset()
        {
            for (int i = 0; i < 3; i++)
            {
                for (int j = 0; j < 3; j++)
                {
                    grid[i, j] = 0;
                }
            }
            UpdateDisplay();
        }

        private void UpdateDisplay()
        {
            for (int i = 0; i < 3; i++)
            {
                for (int j = 0; j < 3; j++)
                {
                    labels[i, j].Text = grid[i, j].ToString();
                }
            }
        }
    }
}
