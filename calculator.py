import typing

import math
import re


class Calc:

    def __init__(self, input_expression):
        self.is_valid = False
        self.result = None
        self.expression = input_expression

    def validate(self):
        if not isinstance(self.expression, str):
            raise TypeError('Invalid input type.')

        if re.search(r"([-/+*])" + r"\1", self.expression):
            raise SyntaxError('Repeating symbols in a row.')

        open_brackets = 0
        for i in self.expression:
            if i == '(':
                open_brackets += 1
            if i == ')':
                open_brackets -= 1
            if open_brackets < 0:
                raise SyntaxError('amount of opened and closed brackets is not matching.')
        if open_brackets > 0:
            raise SyntaxError('amount of opened and closed brackets is not matching.')

        x = re.search(r'^(?:(?:[1-9]\d*|0)(?:\.\d*[1-9])?|exp\(|log\(|[+-/*^()])*$', self.expression)
        self.is_valid = not x is None
        if not self.is_valid:
            raise SyntaxError('invalid input syntax.')

        x = self.expression[0]
        if x == '/' or x == '*':
            raise SyntaxError("expression starts with operation: " + x)

    @staticmethod
    def exp(x):
        return math.exp(x)

    @staticmethod
    def log(x):
        return math.log(x, 10)

    @staticmethod
    def prepare(expression):
        return expression.replace('^', '**').replace('log', 'Calc.log').replace('exp', 'Calc.exp')

    def calculate(self):
        self.validate()
        result = round(eval(Calc.prepare(self.expression)), 3)
        return result

    def output(self) -> typing.Union[float, str]:
        try:
            return self.calculate()
        except SyntaxError as syntax_error:
            return f'Syntax error: {syntax_error.msg}'
        except TypeError:
            return 'Wrong input type.'
        except Exception as error:
            try:
                return f'Abnormal exit: Unexpected error has occurred ({type(error)} {error.msg}).'
            except:
                return f'Abnormal exit: Unexpected error has occurred ({type(error)}).'
