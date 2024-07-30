<?php
declare(strict_types=1);

namespace App\Core\Sorter;

use Illuminate\Database\Eloquent\Builder;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

trait Sortable
{
    public function scopeSort(Builder $query, array $sortingOptions): Builder
    {
        $sortableClassName = get_class($query->getModel());

        foreach ($sortingOptions as $sorterName => $direction) {
            $sorter = ModelSorterFactory::getSorter($sortableClassName, $sorterName);

            if ($sorter && ! in_array($direction, $sorter::allowedOptions())) {
                throw new BadRequestHttpException(
                    message: "Direction {$direction} is not allowed",
                    code: 500,
                );
            }

            return $sorter ? $sorter->updateQuery($query, $direction) : $query;
        }

        return $query;
    }

}
