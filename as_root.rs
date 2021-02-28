
use std::process::Command;
use std::process::exit;

fn main() {
    let output = Command::new("/usr/local/lib/node/bin/node")
        .args(&["/home/kuno/code/co2/co2.js"])
        .output()
        .expect("failed to execute process");

    println!("{}", String::from_utf8_lossy(&output.stdout));
    let errors = String::from_utf8_lossy(&output.stderr);
    let trimmed = errors.trim();

    if !trimmed.is_empty() {
        println!("[ERROR] {}", trimmed);
    }

    match output.status.code() {
        Some(n) => exit(n),
        None => exit(0)
    }
}
