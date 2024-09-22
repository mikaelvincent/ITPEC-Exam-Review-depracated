<?php

class Exam extends Model
{
    public function getAllExams()
    {
        $stmt = $this->db->prepare("SELECT exam_name, exam_alias FROM exams");
        $stmt->execute();
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($results as $key => $exam) {
            $results[$key]["exam_alias_url"] = makeUrlFriendly(
                $exam["exam_alias"]
            );
        }
        return $results;
    }
}
