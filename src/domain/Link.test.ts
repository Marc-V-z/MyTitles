import { describe, it, expect } from "vitest";
import {Link} from "./Link";

describe("link", () => {
    it("deriva o site da URL", () => {
        expect(new Link("https://www.exemplo.com/obra/1").site).toBe("exemplo.com");
    });
    it("rejeita URL inválida", () => {
        expect(() => new Link("isso não é url")).toThrow();
    });
});