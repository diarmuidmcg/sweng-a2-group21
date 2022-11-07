from calculator import Calc
import math


def test_successful_calculation():
    test_value = Calc('11+11+11+11+11+11+11+11+11+11+11+11').calculate()
    assert type(test_value) is int
    assert 132 == test_value

    test_value = Calc('1*10-5000000+200').output()
    assert type(test_value) is int
    assert -4999790 == test_value

    test_value = Calc('1*2+3*4-5*6+7*8-9*10+123*456').calculate()
    assert type(test_value) is int
    assert 56038 == test_value

    test_value = Calc('0').calculate()
    assert type(test_value) is int
    assert 0 == test_value

    test_value = Calc('100-10-20-30').calculate()
    assert type(test_value) is int
    assert 40 == test_value
    
    test_value = Calc('exp(4)').calculate()
    assert type(test_value) is float
    assert 54.598 == test_value
    
    test_value = Calc('3+5*exp(4.2)/(5+7)').calculate()
    assert type(test_value) is float 
    assert 30.786 == test_value
    
    test_value = Calc('(3+5)*2').calculate()
    assert type(test_value) is int
    assert 16 == test_value
    
    test_value = Calc('log(3+2)').calculate()
    assert type(test_value) is float
    assert 1.609 == test_value
    
    test_value = Calc('log(10)').calculate()
    assert type(test_value) is float 
    assert 2.303 == test_value
    
    test_value = Calc('log(9)').calculate()
    assert type(test_value) is float
    assert 2.197 == test_value
    
    
def test_syntax_error_validate():
    try:
        Calc('1**2').validate()
    except Exception as e:
        assert type(e) is SyntaxError
    else:
        assert False, 'No error raised when was expected to.'


def test_syntax_error_output():
    assert 'Syntax error: Repeating symbols in a row.' == Calc('1**2').output()
    assert 'Syntax error: Repeating symbols in a row.' == Calc('3+**8').output()
    assert 'Syntax error: Repeating symbols in a row.' == Calc('4-**3').output()
    assert 'Syntax error: Repeating symbols in a row.' == Calc('5***2').output()

if __name__ == '__main__':
    test_successful_calculation()
    test_syntax_error_validate()
    test_syntax_error_output()


