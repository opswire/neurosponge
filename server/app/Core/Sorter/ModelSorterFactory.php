<?php
declare(strict_types=1);

namespace App\Core\Sorter;

use App\ModelSort\SimpleSorter;
use Illuminate\Config\Repository;
use Illuminate\Support\Facades\App;
use Psr\Log\LoggerInterface;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

final class ModelSorterFactory
{
    public static function getSorter(string $modelClassName, string $columnName): null|ModelSorterInterface
    {
        $sortersMap = App::make(Repository::class)->get('sorting');

        if (! isset($sortersMap[$modelClassName])) {
            throw new NotFoundHttpException(
                message: 'Model not found.',
                code: 404,
            );
        }

        if (isset($sortersMap[$modelClassName][$columnName])) {
            $sorterClass = $sortersMap[$modelClassName][$columnName];

            if (SimpleSorter::class == $sorterClass) {
                return new SimpleSorter($columnName);
            }

            if (is_object($sorterClass)) {
                return $sorterClass;
            }

            return new $sorterClass();
        }

        App::make(LoggerInterface::class)
            ->warning(
                message: 'Sorting column is not supporting.',
                context: [
                    'columnName' => $columnName,
                    'modelName' => $modelClassName,
                ]
            );

        return null;
    }

}
