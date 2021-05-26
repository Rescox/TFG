<?php
// This file is part of Moodle Course Rollover Plugin
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.


global $DB;

require_once(__DIR__. '/../../config.php');
$PAGE->set_url(new moodle_url('/local/moophish/manage.php'));
$PAGE->set_context(\context_system::instance());
$PAGE->set_title('Manage moophish');

$messages = $DB->get_records('local_moophish');

echo $OUTPUT->header();

$templatecontext = (object)[
    'messages' => array_values($messages),
    'editurl' => new moodle_url('/local/moophish/edit.php'),
];

echo $OUTPUT->render_from_template('local_moophish/manage', $templatecontext);

echo $OUTPUT->footer();
?>