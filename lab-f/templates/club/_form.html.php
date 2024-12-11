<?php
    /** @var $club ?\App\Model\Club */
?>

<div class="form-group">
    <label for="subject">Title</label>
    <input type="text" id="subject" name="club[subject]" value="<?= $club ? $club->getSubject() : '' ?>">
</div>

<div class="form-group">
    <label for="content">Description</label>
    <textarea id="content" name="club[content]"><?= $club? $club->getContent() : '' ?></textarea>
</div>

<div class="form-group">
    <label></label>
    <input type="submit" value="Submit">
</div>