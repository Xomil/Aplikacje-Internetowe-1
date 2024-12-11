<?php

/** @var \App\Model\Club[] $clubs */
/** @var \App\Service\Router $router */

$title = 'Club List';
$bodyClass = 'index';

ob_start(); ?>
    <h1>Club List</h1>

    <a href="<?= $router->generatePath('club-create') ?>">Create new</a>

    <ul class="index-list">
        <?php foreach ($clubs as $club): ?>
            <li><h3><?= $club->getSubject() ?></h3>
                <ul class="action-list">
                    <li><a href="<?= $router->generatePath('club-show', ['id' => $club->getId()]) ?>">Details</a></li>
                    <li><a href="<?= $router->generatePath('club-edit', ['id' => $club->getId()]) ?>">Edit</a></li>
                </ul>
            </li>
        <?php endforeach; ?>
    </ul>

<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';