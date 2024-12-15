import sys

from .models import Formula

from fuzzywuzzy import process, fuzz
from difflib import SequenceMatcher


def get_matching_indexes(str1, str2):
    matcher = SequenceMatcher(None, str1, str2)
    return matcher.find_longest_match(0, len(str1), 0, len(str2))


def find_coincidence(formula):
    db_formulas = Formula.objects.values_list('formula', flat=True)
    best_match = process.extractOne(formula, db_formulas, scorer=fuzz.partial_ratio)
    print(best_match, file=sys.stderr)
    match = get_matching_indexes(best_match[0], formula)

    if match.size == 0:
        return {'formula': formula, 'coincidence': 0}

    formula = best_match[0]

    matched_formula = (
            formula[:match.a] +
            '\\textcolor{red}{' +
            formula[match.a:match.a + match.size] +
            '}' +
            formula[match.a + match.size:]
    )

    return {'formula': matched_formula, 'coincidence': best_match[1]}
