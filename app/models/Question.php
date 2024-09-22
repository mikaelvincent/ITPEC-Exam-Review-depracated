<?php

class Question extends Model
{
    public function getQuestionsByExamSetId($exam_set_id)
    {
        $stmt = $this->db->prepare(
            "SELECT * FROM questions WHERE exam_set_id = :exam_set_id ORDER BY question_number ASC"
        );
        $stmt->execute(["exam_set_id" => $exam_set_id]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
