<?php
declare(strict_types=1);

namespace App\Core\DTO;

use App\Core\Enum\SortingDirectionEnum;
use Illuminate\Validation\Rule;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Support\Validation\ValidationContext;

abstract class AbstractGetDTO extends Data
{
    public int $page = 1;

    public int $per_page = 10;

    public bool $paginate = true;

    public null|string $query;

    public array $filter = [];

    public array $sort = [];

    public static function rules(ValidationContext $context): array
    {
        $rules = [
            'page' => ['nullable', 'integer', 'min:1'],
            'per_page' => ['nullable', 'integer', 'min:1', 'max:100'],
            'paginate' => ['nullable', 'boolean'],
            'query' => ['nullable', 'string', 'max:64'],
            'filter' => ['nullable', 'array'],
            'sort' => ['nullable', 'array'],
            'sort.*' => ['nullable', Rule::enum(SortingDirectionEnum::class)],
        ];

        return array_merge($rules, static::additionalRules($context));
    }

    public static function additionalRules(ValidationContext $context): array
    {
        return [];
    }
}

