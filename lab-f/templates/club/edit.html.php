<?php

/** @var \App\Model\Club $club */
/** @var \App\Service\Router $router */

$title = "Edit Club {$club->getSubject()} ({$club->getId()})";
$bodyClass = "edit";

ob_start(); ?>
    <h1><?= $title ?></h1>
    <form action="<?= $router->generatePath('club-edit') ?>" method="post" class="edit-form">
        <?php require __DIR__ . DIRECTORY_SEPARATOR . '_form.html.php'; ?>
        <input type="hidden" name="action" value="club-edit">
        <input type="hidden" name="id" value="<?= $club->getId() ?>">
    </form>

    <ul class="action-list">
        <li>
            <a href="<?= $router->generatePath('club-index') ?>">Back to list</a></li>
        <li>
            <form action="<?= $router->generatePath('club-delete') ?>" method="post">
                <input type="submit" value="Delete" onclick="return confirm('Are you sure?')">
                <input type="hidden" name="action" value="club-delete">
                <input type="hidden" name="id" value="<?= $club->getId() ?>">
            </form>
        </li>
    </ul>

<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';