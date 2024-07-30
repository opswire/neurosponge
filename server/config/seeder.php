<?php
declare(strict_types=1);

use App\Models\Common\Roles\Role;

return [
    'roles' => [
        [
            'name' => Role::ADMIN,
            'display_name' => 'Администратор',
        ],
        [
            'name' => Role::STUDENT,
            'display_name' => 'Студент',
        ],
    ],
];

