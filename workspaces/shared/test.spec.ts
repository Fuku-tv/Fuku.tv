describe('Math tests', () => {
  it('should add 2 and 2', () => {
    // Arrange
    const expected = 4;

    // Act
    const actual = add(2, 2);

    // Assert
    expect(actual).toBe(expected);
  });
});

const add = (a, b) => a + b;
