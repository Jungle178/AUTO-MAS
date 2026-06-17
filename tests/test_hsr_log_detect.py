from dataclasses import dataclass

from app.task.HSR.tools.log_detect import detect_weekly_completion
from app.task.HSR.tools.sra_control import _on_sra_weekly_success


@dataclass
class ExternalResult:
    output: str = ""
    error: str = ""


def test_sra_divergent_full_point_rewards_marks_weekly_complete():
    result = ExternalResult(
        output="""
10:18:41 | INFO  | 执行任务：旷宇纷争-模拟宇宙
10:18:41 | INFO  | 执行任务：差分宇宙-周期演算
10:18:53 | INFO  | 当前积分奖励: 18000/18000
10:19:02 | INFO  | Mission accomplished
10:19:02 | INFO  | 旷宇纷争任务全部完成
10:19:02 | INFO  | 配置 'Default' 中的所有任务已完成。
"""
    )

    completed, reason = detect_weekly_completion(result, "SRA", "DivergentUniverse")

    assert completed is True
    assert "SRA 日志命中周常完成 marker" in reason


def test_sra_weekly_success_callback_queues_completion_for_full_point_rewards():
    queued: list[tuple[str, str, str]] = []
    recorded: list[dict] = []
    result = ExternalResult(
        output="""
10:18:41 | INFO  | 执行任务：旷宇纷争-模拟宇宙
10:18:41 | INFO  | 执行任务：差分宇宙-周期演算
10:18:53 | INFO  | 当前积分奖励: 18000/18000
10:19:02 | INFO  | Mission accomplished
10:19:02 | INFO  | 旷宇纷争任务全部完成
10:19:02 | INFO  | 配置 'Default' 中的所有任务已完成。
"""
    )

    _on_sra_weekly_success(
        result=result,
        uid="uid-1",
        user_name="悬浮水母",
        module_name="差分宇宙",
        module_key="DivergentUniverse",
        queue_weekly_completion=lambda uid, user_name, module_name: queued.append(
            (uid, user_name, module_name)
        ),
        record_module_result=lambda **kwargs: recorded.append(kwargs),
    )

    assert queued == [("uid-1", "悬浮水母", "差分宇宙")]
    assert recorded == []
