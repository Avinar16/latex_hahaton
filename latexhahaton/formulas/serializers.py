from rest_framework import serializers


class FormulaSerializer(serializers.Serializer):
    formula = serializers.CharField(max_length=1024)
