<?php
declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\BaseModel
 *
 * @method static Builder|AbstractModel newModelQuery()
 * @method static Builder|AbstractModel newQuery()
 * @method static Builder|AbstractModel query()
 */

abstract class AbstractModel extends Model
{
    public static function getTableName(): string
    {
        return with(new static())->getTable();
    }
}
