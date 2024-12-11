<?php

/** @var \App\Model\Club $club */
/** @var \App\Service\Router $router */

$title = 'Create Club';
$bodyClass = "edit";

ob_start(); ?>
    <h1>Create Club</h1>
    <form action="<?= $router->generatePath('club-create') ?>" method="post" class="edit-form">
        <?php require __DIR__ . DIRECTORY_SEPARATOR . '_form.html.php'; ?>
        <input type="hidden" name="action" value="club-create">
    </form>

    <a href="<?= $router->generatePath('club-index') ?>">Back to list</a>
<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';